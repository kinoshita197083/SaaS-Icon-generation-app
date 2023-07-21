import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { b64Image } from "~/data/b64Image";
import AWS from 'aws-sdk';
import { randomUUID } from "crypto";

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: env.ACCESS_KEY_ID,
        secretAccessKey: env.SECRET_ACCESS_KEY,
    },
    region: "ap-southeast-2",
});

const BUCKET_NAME = "imagin-icons-storage";
const preSignedUrlExpireSeconds = 60 * 5;

//OpenAI config & client setup
const configuration = new Configuration({
    apiKey: env.DALLE_API_KEY
});

const openai = new OpenAIApi(configuration);

const generateIcon = async (prompt: string, numberOfPic: number): Promise<(string | undefined)[]> => {
    if (env.MOCK_DALLE === "true") {
        return [b64Image];
    } else {
        console.log('Icons generating...')
        const response = await openai.createImage({
            prompt,
            n: numberOfPic,
            size: "1024x1024",
            response_format: "b64_json"
        });

        return response.data.data.map(res => res.b64_json)
    }
}

export const generateRouter = createTRPCRouter({
    generateIcon: protectedProcedure
        .input(z.object({
            prompt: z.string(),
            color: z.string(),
            style: z.string(),
            n: z.number(),
        }))
        .mutation(async ({ ctx, input }) => {
            //verify user has enough credits
            const user = await ctx.prisma.user.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
                select: {
                    credits: true,
                },
            });

            if (!user) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'User not found',
                });
            }

            const { credits } = user;

            if (credits < input.n) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Not enough credits',
                });
            }

            try {
                // masterpiece, hyper detailed, high-resolution, elegant, perfect face, upper body,
                // const summary = `${input.prompt}, 1080p, 8k, ultra-quality, deepth focus, hyper detailed, high-resolution, elegant, perfect face, ${input.style} style, with a ${input.color} color theme`;
                const summary = `"Generate an image of ${input.prompt} with the following specifications:

                Resolution: 1080p, (ultra-quality, high-resolution).
                Focus: Deep focus with hyper-detailing for a captivating visual experience.
                Subject: An elegant and perfect face with calm emotion.
                Style: ${input.style}.
                Color Theme: Incorporate a ${input.color} color theme to add vibrancy and visual appeal."`;

                const base64EncodedImageList = await generateIcon(summary, input.n);
                console.log('Icons generation completed...')

                // prepare for batch upload to prisma
                const iconsData = base64EncodedImageList.map(__ => ({
                    prompt: input.prompt,
                    userId: ctx.session.user.id,
                    id: randomUUID(),
                }));

                // save icon prompt & user id to prisma database and generate a unique icon id to use as s3 bucket Key
                const createdIcons = await ctx.prisma.icon.createMany({
                    data: iconsData,
                    skipDuplicates: true,
                });

                // batch saving b64 encoded images to s3 bucket
                const putEvents: any[] = [];
                for (let i = 0; i < base64EncodedImageList.length; i++) {
                    const putEvent = s3
                        .putObject({
                            Bucket: BUCKET_NAME,
                            Body: Buffer.from(base64EncodedImageList[i]!, "base64"),
                            Key: iconsData[i]!.id,
                            ContentEncoding: "base64",
                            ContentType: "image/png",
                        })
                        .promise();
                    putEvents.push(putEvent);
                }

                await Promise.all(putEvents);

                // generate presigned URL so that the link will expire in a given time
                const preSignedUrls = await Promise.all(
                    iconsData.map(icon => {
                        return s3.getSignedUrl("getObject", {
                            Bucket: BUCKET_NAME,
                            Key: icon.id,
                            Expires: preSignedUrlExpireSeconds,
                            ResponseContentDisposition: `attachment; filename="${input.prompt}.png"`,
                        });
                    })
                );

                // Deduct credits
                await ctx.prisma.user.update({
                    where: {
                        id: ctx.session.user.id,
                    },
                    data: {
                        credits: {
                            decrement: input.n,
                        },
                    },
                });

                return {
                    images: preSignedUrls,
                };

            } catch (error) {
                // Proper error handling code goes here
                console.error('Something wrong: ', error);
                throw error; // Rethrow the error or handle it accordingly
            }
        }),
});


