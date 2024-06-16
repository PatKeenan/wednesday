import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { holeInsertSchema, holes, holeSelectSchema } from "@/server/db/schema";
import { asc, eq } from "drizzle-orm";

export const holeRouter = createTRPCRouter({
  getHoles: publicProcedure.query(async ({ ctx }) => {
    return;
  }),
  getHole: publicProcedure
    .input(holeSelectSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.holes.findFirst({
        where: (hole, { eq }) => eq(hole.id, input.id),
      });
    }),
  updateHole: publicProcedure
    .input(holeSelectSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, courseId, ...holeRest } = input;
      return await ctx.db.update(holes).set(holeRest).where(eq(holes.id, id));
    }),
});
