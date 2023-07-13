import {
    createTRPCRouter,
    // protectedProcedure,
    publicProcedure
} from "~/server/api/trpc";

export const statisticRouter = createTRPCRouter({
    getStatistic: publicProcedure.query(async ({ ctx }) => {
        const users = ctx.prisma.user.count();
        const icons = ctx.prisma.icon.count();
        const statistic = await Promise.all([users, icons]);

        return statistic
    }),
});
