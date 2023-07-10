import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";
import {
    createTRPCRouter,
    publicProcedure,
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

const generateIcon = async (prompt: string): Promise<string | undefined> => {
    if (env.MOCK_DALLE === "true") {
        // '/jene.jpg'
        return b64Image;
    } else {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        });
        return response.data.data[0]?.b64_json;
    }
}

export const generateRouter = createTRPCRouter({
    generateIcon: protectedProcedure
        .input(z.object({
            prompt: z.string(),
            color: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            //verify user has enough credits
            const { count } = await ctx.prisma.user.updateMany({
                where: {
                    id: ctx.session.user.id,
                    credits: {
                        gte: 1,
                    },
                },
                data: {
                    credits: {
                        decrement: 1
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

            // //https://platform.openai.com/docs/guides/images/usage
            // const response = await openai.createImage({
            //     prompt: input.prompt,
            //     n: 1,
            //     size: "1024x1024"
            // });

            // const image_url = response.data.data[0]?.url;
            const base64EncodedImage = await generateIcon(input.prompt);

            // save icon prompt & user id to prisma database and generate a unique icon id to use as s3 bucket Key
            const icon = await ctx.prisma.icon.create({
                data: {
                    prompt: `an image with a background color of ${input.color} and with elements including: ${input.prompt}`,
                    userId: ctx.session.user.id,
                },
            })

            // save image base 64 code to s3 bucket
            await s3.putObject({
                Bucket: BUCKET_NAME,
                Body: Buffer.from(base64EncodedImage!, "base64"),
                Key: icon.id,
                ContentEncoding: "base64",
                ContentType: "image/png",
            })
                .promise();

            const preSignedUrl = s3.getSignedUrl('getObject', {
                Bucket: BUCKET_NAME,
                Key: icon.id,
                Expires: preSignedUrlExpireSeconds,
                ResponseContentDisposition: `attachment; filename="${input.prompt}"`,
            })

            return {
                image: preSignedUrl
                // image: `https://${BUCKET_NAME}.s3.ap-southeast-2.amazonaws.com/${icon.id}`,
            }
        }),
});


