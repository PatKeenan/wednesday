import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { holeInsertSchema, holes, holeSelectSchema } from "@/server/db/schema";
import { asc, eq } from "drizzle-orm";

export const holeRouter = createTRPCRouter({
  getHoles: protectedProcedure.query(async ({ ctx }) => {
    return;
  }),
  getHole: protectedProcedure
    .input(holeSelectSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.holes.findFirst({
        where: (hole, { eq }) => eq(hole.id, input.id),
      });
    }),
  updateHole: protectedProcedure
    .input(holeSelectSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, courseId, ...holeRest } = input;
      return await ctx.db.update(holes).set(holeRest).where(eq(holes.id, id));
    }),
});
