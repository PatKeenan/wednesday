import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { courseRouter } from "@/server/api/routers/course";
import { holeRouter } from "@/server/api/routers/hole";
import { roundRouter } from "@/server/api/routers/round";
import { golferRouter } from "@/server/api/routers/golfer";
import { generalRouter } from "./routers/general";

export const appRouter = createTRPCRouter({
  round: roundRouter,
  golfer: golferRouter,
  hole: holeRouter,
  course: courseRouter,
  holes: holeRouter,
  general: generalRouter,
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
