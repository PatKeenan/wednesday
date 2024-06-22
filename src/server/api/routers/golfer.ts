import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  golferInsertSchema,
  golfers,
  golferSelectSchema,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

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
  createGolfer: protectedProcedure
    .input(golferInsertSchema.required({ name: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(golfers).values(input).returning();
    }),
  updateGolfer: protectedProcedure
    .input(golferSelectSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...golferRest } = input;
      return await ctx.db
        .update(golfers)
        .set(golferRest)
        .where(eq(golfers.id, id));
    }),
  deleteGolfer: protectedProcedure
    .input(golferSelectSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(golfers).where(eq(golfers.id, input.id));
    }),
});
