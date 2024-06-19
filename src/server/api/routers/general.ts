import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const generalRouter = createTRPCRouter({
  getNewRoundFormOptions: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.transaction(async (trx) => {
      const courses = await trx.query.courses.findMany({
        orderBy: (course, { asc }) => [asc(course.name)],
      });

      const golfers = await trx.query.golfers.findMany();
      return { courses, golfers };
    });
  }),
});
