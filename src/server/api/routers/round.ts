import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import {
  golferSelectSchema,
  golfersToRounds,
  golfersToRoundsRelations,
  roundInsertSchema,
  roundInsertWithGolfersSchema,
  rounds,
  roundSelectSchema,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

export const roundRouter = createTRPCRouter({
  getRounds: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.rounds.findMany({
      orderBy: (rounds, { desc }) => [desc(rounds.date)],
      with: {
        course: {
          columns: {
            id: true,
            name: true,
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
  getRound: publicProcedure
    .input(roundSelectSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.rounds.findFirst({
        where: (rounds, { eq }) => eq(rounds.id, input.id),
        with: {
          course: true,
          golfers: {
            with: {
              golfer: true,
            },
          },
        },
      });
    }),
  createRound: publicProcedure
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
});
