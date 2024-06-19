import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import {
  golfersToRounds,
  roundInsertSchema,
  roundInsertWithGolfersSchema,
  rounds,
  roundSelectSchema,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const roundRouter = createTRPCRouter({
  getRounds: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.rounds.findMany({
      orderBy: (rounds, { desc }) => [desc(rounds.date)],
      with: {
        course: {
          columns: {
            id: true,
            name: true,
            total_holes: true,
          },
        },
        golfers: {
          with: {
            golfer: true,
          },
        },
      },
    });
  }),
  getRound: protectedProcedure
    .input(
      roundSelectSchema.pick({ id: true }).extend({
        withHoles: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.rounds.findFirst({
        where: (rounds, { eq }) => eq(rounds.id, input.id),
        with: {
          course: input.withHoles
            ? {
                with: {
                  holes: {
                    orderBy: (hole, { asc }) => [asc(hole.id)],
                  },
                },
              }
            : true,
          golfers: {
            with: {
              golfer: true,
            },
          },
        },
      });
    }),
  createRound: protectedProcedure
    .input(roundInsertWithGolfersSchema)
    .mutation(async ({ ctx, input }) => {
      const { golferIds, ...roundRest } = input;
      const roundData = await ctx.db.transaction(async (trx) => {
        const round = await trx
          .insert(rounds)
          .values(roundRest)
          .returning()
          .execute();

        if (!round[0]) {
          return;
        }
        const roundId = round[0].id;

        if (!roundId) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Round must have an id",
          });
        }

        const golfersToInsert = golferIds?.map((golferId) => {
          return {
            round_id: roundId,
            golfer_id: golferId.id,
          };
        });

        if (!golfersToInsert) {
          console.log("No golfers to insert");
          return;
        }

        await trx.insert(golfersToRounds).values(golfersToInsert).execute();

        return round[0];
      });
      return roundData;
    }),
  updateRound: protectedProcedure
    .input(roundInsertSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Round must have an id",
        });
      }
      return await ctx.db
        .update(rounds)
        .set({
          ...input,
        })
        .where(eq(rounds.id, input.id))
        .returning();
    }),
  deleteRound: protectedProcedure
    .input(roundSelectSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(rounds).where(eq(rounds.id, input.id));
    }),
});
