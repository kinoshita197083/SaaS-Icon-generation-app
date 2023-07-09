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
    region: "us-east-1",
});

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
        .input(z.object({ prompt: z.string() }))
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

            // save image base 64 code to s3 bucket
            await s3.putObject({
                Bucket: "icon-generator-project-haha",
                Body: Buffer.from(base64EncodedImage!, "base64"),
                // TODO: generate a random id
                Key: "my-image2",
                ContentEncoding: "base64",
                ContentType: "image/png",
            }).promise();

            return {
                image: base64EncodedImage
            }
        }),
});


