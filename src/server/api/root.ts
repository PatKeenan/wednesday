import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { courseRouter } from "@/server/api/routers/course";
import { holeRouter } from "@/server/api/routers/hole";
import { roundRouter } from "@/server/api/routers/round";
import { golferRouter } from "@/server/api/routers/golfer";
import { generalRouter } from "./routers/general";
import { scoreRouter } from "./routers/score";
import type { inferRouterOutputs } from "@trpc/server";

export const appRouter = createTRPCRouter({
  round: roundRouter,
  golfer: golferRouter,
  hole: holeRouter,
  course: courseRouter,
  holes: holeRouter,
  general: generalRouter,
  score: scoreRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type RoundOutput = RouterOutput["round"];
export type GolferOutput = RouterOutput["golfer"];
export type HoleOutput = RouterOutput["hole"];
export type CourseOutput = RouterOutput["course"];
export type GeneralOutput = RouterOutput["general"];

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
