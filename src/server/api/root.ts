/* import { roundRouter } from "@/server/api//routers/round";
import { golferRouter } from "@/server/api/routers/golfer";
import { holeRouter } from "@/server/api/routers/hole"; */
import { courseRouter } from "@/server/api/routers/course";

import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  /*   round: roundRouter,
  golfer: golferRouter,
  hole: holeRouter, */
  course: courseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
