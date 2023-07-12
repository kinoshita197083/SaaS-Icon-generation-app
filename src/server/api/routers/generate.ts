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

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: env.ACCESS_KEY_ID,
        secretAccessKey: env.SECRET_ACCESS_KEY,
    },
    region: "ap-southeast-2",
});

const BUCKET_NAME = "icon-generator-project-haha";
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
            const { count } = await ctx.prisma.user.updateMany({
                where: {
                    id: ctx.session.user.id,
                    credits: {
                        gte: input.n,
                    },
                },
                data: {
                    credits: {
                        decrement: input.n
                    }
                }
            });

            //Handle not enough credits
            if (count <= 0) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Not enough credits'
                })
            }
            // masterpiece, hyper detailed, high-resolution, elegant, perfect face, upper body, 
            const summary = `${input.prompt},masterpiece, hyper detailed, high-resolution, elegant, perfect face, upper body,  color theme-${input.color}, ${input.style} style`

            const base64EncodedImageList = await generateIcon(summary, input.n);

            // prepare for batch upload to prisma
            const iconsData = base64EncodedImageList.map(__ => ({
                prompt: input.prompt,
                userId: ctx.session.user.id,
            }));

            // save icon prompt & user id to prisma database and generate a unique icon id to use as s3 bucket Key
            const createdIcons = await Promise.all(
                iconsData.map(async iconData => await ctx.prisma.icon.create({ data: iconData }))
            );

            // batch saving b64 encoded images to s3 bucket
            const putEvents = [];
            for (let i = 0; i < base64EncodedImageList.length; i++) {
                const putEvent =
                    s3.putObject({
                        Bucket: BUCKET_NAME,
                        Body: Buffer.from(base64EncodedImageList[i]!, "base64"),
                        Key: createdIcons[i]!.id,
                        ContentEncoding: "base64",
                        ContentType: "image/png",
                    })
                        .promise();
                putEvents.push(putEvent)
            }

            await Promise.all(putEvents);

            // generate presigned url so that the link will expire in a given time
            const preSignedUrls = await Promise.all(createdIcons.map(icon => {
                return (s3.getSignedUrl('getObject', {
                    Bucket: BUCKET_NAME,
                    Key: icon.id,
                    Expires: preSignedUrlExpireSeconds,
                    ResponseContentDisposition: `attachment; filename="${input.prompt}.png"`,
                }))
            }
            ));



            return {
                image: preSignedUrls
                // image: `https://${BUCKET_NAME}.s3.ap-southeast-2.amazonaws.com/${icon.id}`,
            }
        }),
});


