import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { posts } from "@/server/db/schema";

export const holeRouter = createTRPCRouter({});
