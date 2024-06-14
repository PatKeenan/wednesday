import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { courseInsertSchema, courseSelectSchema } from "@/server/db/schema";

import { courses } from "@/server/db/schema";
import { eq } from "drizzle-orm";

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
      });
    }),
  createCourse: publicProcedure
    .input(courseInsertSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(courses).values(input);
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
