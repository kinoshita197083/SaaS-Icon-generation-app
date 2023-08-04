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

//production
const BUCKET_NAME = "imagin-icons-storage";

//Dev
// const BUCKET_NAME = "imagin-dev-env";

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
            styleType: z.string(),
            orientation: z.string().optional(),
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
                let summary = '';

                if (input.styleType === 'icon') {
                    summary = `a professional, high resolution, ${input.style} featuring ${input.prompt}, ${input.orientation}, calm, quiet, elaborate, detailed, clean, with ${input.color} as theme color`
                }

                if (input.styleType === 'Logo') {
                    summary = `a professional, modern, high resolution, 1080p, centered, logo, textless, ${input.prompt}, ${input.style}, with ${input.color} background color, elaborate, detailed, clean`;
                }

                const base64EncodedImageList = await generateIcon(summary, input.n);
                console.log('Icons generation completed...')

                // prepare for batch upload to prisma
                const iconsData = base64EncodedImageList.map(__ => ({
                    prompt: input.prompt,
                    userId: ctx.session.user.id,
                    id: randomUUID(),
                }));

                // save icon prompt & user id to prisma database and generate a unique icon id to use as s3 bucket Key
                await ctx.prisma.icon.createMany({
                    data: iconsData,
                    skipDuplicates: true,
                });

                //Dev environment: SQLite doesn't support createMany()
                // for (const iconData of iconsData) {
                //     await ctx.prisma.icon.create({
                //         data: iconData,
                //     });
                // }

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


