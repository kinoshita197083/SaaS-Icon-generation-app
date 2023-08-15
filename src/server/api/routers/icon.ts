import AWS from "aws-sdk";
import { z } from "zod";
import { env } from "~/env.mjs";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: env.ACCESS_KEY_ID,
        secretAccessKey: env.SECRET_ACCESS_KEY,
    },
    region: "ap-southeast-2",
});

const BUCKET_NAME = 'imagin-icons-storage';

export const iconsRouter = createTRPCRouter({
    getIcons: protectedProcedure.input(z.object({
        limit: z.number(),
        // cursor is a reference to the last item in the previous batch
        // it's used to fetch the next batch
        cursor: z.string().nullish(),
        skip: z.number().optional(),
    })
    )
        .query(async ({ ctx, input }) => {

            const { limit, skip, cursor } = input;

            const icons = await ctx.prisma.icon.findMany({
                take: limit + 1,
                skip: skip,
                cursor: cursor ? { id: cursor } : undefined,
                where: {
                    userId: ctx.session.user.id
                }
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (icons.length > limit) {
                const nextItem = icons.pop(); // return the last item from the array
                nextCursor = nextItem?.id;
            }

            return {
                icons,
                nextCursor,
            }
        }),

    getAllUsersIcons: publicProcedure.input(z.object({
        limit: z.number(),
        // cursor is a reference to the last item in the previous batch
        // it's used to fetch the next batch
        cursor: z.string().nullish(),
        skip: z.number().optional(),
    })
    )
        .query(async ({ ctx, input }) => {

            const { limit, skip, cursor } = input;

            const iconIds = await ctx.prisma.icon.findMany({
                take: limit + 1,
                skip: skip,
                cursor: cursor ? { id: cursor } : undefined,
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (iconIds.length > limit) {
                const nextItem = iconIds.pop(); // return the last item from the array
                nextCursor = nextItem?.id;
            }

            return {
                iconIds,
                nextCursor,
            }
        }),

    deleteIcon: protectedProcedure.input(z.object({
        iconId: z.string()
    }))
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.prisma.icon.delete({
                    where: {
                        id: input.iconId,
                    },
                });

                await s3.deleteObject({
                    Bucket: BUCKET_NAME,
                    Key: input.iconId,
                }).promise();

            } catch (error) {
                console.error('Something wrong: ', error);
                throw error; // Rethrow the error or handle it accordingly
            }
        })
});
