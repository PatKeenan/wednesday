import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { golferSelectSchema } from "@/server/db/schema";

export const golferRouter = createTRPCRouter({
  getGolfers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.golfers.findMany({
      orderBy: (golfer, { asc }) => [asc(golfer.name)],
    });
  }),
  getGolfer: publicProcedure
    .input(golferSelectSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.golfers.findFirst({
        where: (golfer, { eq }) => eq(golfer.id, input.id),
      });
    }),
});
