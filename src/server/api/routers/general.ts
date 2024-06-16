import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { golferSelectSchema } from "@/server/db/schema";

export const generalRouter = createTRPCRouter({
  getNewRoundFormOptions: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.transaction(async (trx) => {
      const courses = await trx.query.courses.findMany({
        orderBy: (course, { asc }) => [asc(course.name)],
      });

      const golfers = await trx.query.golfers.findMany();
      return { courses, golfers };
    });
  }),
});
