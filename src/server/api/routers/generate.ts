import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";


//OpenAI config & client setup
const configuration = new Configuration({
    apiKey: env.DALLE_API_KEY
});

const openai = new OpenAIApi(configuration);


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

            //https://platform.openai.com/docs/guides/images/usage
            const response = await openai.createImage({
                prompt: input.prompt,
                n: 1,
                size: "1024x1024"
            });

            const image_url = response.data.data[0]?.url;

            return {
                image: image_url
            }
        }),
});


