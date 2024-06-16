import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import {
  courseInsertSchema,
  courseSelectSchema,
  holeInsertSchema,
  holes,
} from "@/server/db/schema";

import { courses } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const courseRouter = createTRPCRouter({
  getCourses: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.courses.findMany({
      orderBy: (course, { asc }) => [asc(course.name)],
    });
  }),
  getCourse: publicProcedure
    .input(courseSelectSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.courses.findFirst({
        where: (course, { eq }) => eq(course.id, input.id),
        with: {
          holes: {
            orderBy: (hole, { asc }) => [asc(hole.id)],
          },
        },
      });
    }),
  createCourse: publicProcedure
    .input(courseInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.transaction(async (trx) => {
        const course = await trx
          .insert(courses)
          .values(input)
          .returning()
          .execute();
        const returnedCourse = course[0];

        if (!returnedCourse) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Course must have holes and an id",
          });
        }
        const holesToInsert = Array.from({
          length: returnedCourse.holes || 18,
        }).map((_, i) => ({
          courseId: returnedCourse.id,
          holeNumber: i + 1,
        }));

        await trx.insert(holes).values(holesToInsert);
        return course;
      });
      return result;
    }),
  updateCourse: publicProcedure
    .input(courseSelectSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(courses)
        .set({
          ...input,
        })
        .where(eq(courses.id, input.id));
    }),
  deleteCourse: publicProcedure
    .input(courseSelectSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(courses).where(eq(courses.id, input.id));
    }),
});
