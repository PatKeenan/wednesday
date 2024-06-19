import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { golferSelectSchema } from "@/server/db/schema";

export const golferRouter = createTRPCRouter({
  getGolfers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.golfers.findMany({
      orderBy: (golfer, { asc }) => [asc(golfer.name)],
    });
  }),
  getGolfer: protectedProcedure
    .input(golferSelectSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.golfers.findFirst({
        where: (golfer, { eq }) => eq(golfer.id, input.id),
      });
    }),
});
