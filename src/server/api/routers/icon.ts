import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const iconsRouter = createTRPCRouter({
    getIcons: protectedProcedure.query(async ({ ctx }) => {
        const icons = await ctx.prisma.icon.findMany({
            where: {
                userId: ctx.session.user.id
            }
        })

        return {
            icons
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
                // select: { id: true },
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (iconIds.length > limit) {
                const nextItem = iconIds.pop(); // return the last item from the array
                nextCursor = nextItem?.id;
            }

            // iconIds.map((icon) => icon.id);
            return {
                iconIds,
                nextCursor,
            }
        })
});
