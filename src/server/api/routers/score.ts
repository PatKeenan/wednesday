import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  scoreSelectSchema,
  scoreInsertSchema,
  scores,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and } from "drizzle-orm";

export const scoreRouter = createTRPCRouter({
  getScores: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.scores.findMany({});
  }),
  getScoresForRound: protectedProcedure
    .input(scoreSelectSchema.pick({ roundId: true }))
    .query(async ({ ctx, input }) => {
      if (!input.roundId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "roundId is required",
        });
      }
      return await ctx.db.query.scores.findMany({
        where: (score, { eq }) => eq(score.roundId, input.roundId),
      });
    }),
  getRoundHoleScoreAllGolfers: protectedProcedure
    .input(scoreSelectSchema.pick({ holeId: true, roundId: true }))
    .query(async ({ ctx, input }) => {
      if (!input.holeId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "holeId is required",
        });
      }
      return await ctx.db.query.scores.findMany({
        where: (score, { eq }) =>
          and(eq(score.holeId, input.holeId), eq(score.roundId, input.roundId)),
      });
    }),
  getHoleScoreForGolfer: protectedProcedure
    .input(
      scoreSelectSchema.pick({ holeId: true, roundId: true, golferId: true }),
    )
    .query(async ({ ctx, input }) => {
      if (!input.holeId || !input.golferId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "holeId and golferId are required",
        });
      }
      return await ctx.db.query.scores.findFirst({
        where: (score, { eq }) =>
          and(
            eq(score.holeId, input.holeId),
            eq(score.roundId, input.roundId),
            eq(score.golferId, input.golferId),
          ),
      });
    }),
  createScore: protectedProcedure
    .input(scoreInsertSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (trx) => {
        const score = await trx
          .insert(scores)
          .values(input)
          .returning()
          .execute();
        return score[0];
      });
    }),
  upsertScore: protectedProcedure
    .input(scoreInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      return await ctx.db
        .insert(scores)
        .values({ ...input })
        .onConflictDoUpdate({
          target: scores.id,
          set: {
            ...rest,
          },
        })
        .execute();
    }),
});
