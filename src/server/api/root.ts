import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { generateRouter } from "./routers/generate";
import { getUserRouter } from "./routers/getUser";
import { checkoutRouter } from "./routers/checkout";
import { iconsRouter } from "./routers/icon";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  generate: generateRouter,
  user: getUserRouter,
  checkout: checkoutRouter,
  icons: iconsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
