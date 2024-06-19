import { Button } from "@/components/ui/button";
import { DetailScreenLayout } from "@/layouts/DetailScreenLayout";
import type { RoundOutput } from "@/server/api/root";
import { api } from "@/trpc/react";
import Link from "next/link";
import * as React from "react";

export const RoundSummary: React.FC<{
  round: RoundOutput["getRound"];
  handleRestart?: () => void;
}> = ({ round, handleRestart }) => {
  const { data: scores, isLoading } = api.score.getScoresForRound.useQuery({
    roundId: round?.id ?? -1,
  });

  const coursePar = React.useMemo(
    () =>
      round?.course?.holes.reduce((acc, curr) => {
        return acc + (curr?.par ?? 0);
        return acc;
      }, 0),
    [round?.course?.holes],
  );

  const scoresByGolfer = React.useMemo(() => {
    const groupedScores = scores?.reduce(
      (acc, score) => {
        if (!acc[score.golferId]) {
          acc[score.golferId] = [];
          return acc;
        }
        acc[score.golferId]?.push(score);
        return acc;
      },
      {} as Record<number, typeof scores>,
    );

    if (!groupedScores) {
      return [];
    }
    // Loop over the scores array and add each score to the appropriate golfer
    const scoreTotals = Object.entries(groupedScores).map(
      ([golferId, scores]) => {
        const total = scores.reduce(
          (acc, score) => acc + (score?.strokes ?? 0),
          0,
        );
        return {
          golferId: parseInt(golferId, 10),
          total,
          name: round?.golfers.find(
            (g) => g.golfer_id === parseInt(golferId, 10),
          )?.golfer.name,
        };
      },
    );
    return scoreTotals;
  }, [scores, round?.golfers]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <DetailScreenLayout
      headerTitle={"Round Summary"}
      onDeleteClick={() => {
        console.log("Delete clicked");
      }}
    >
      <div className="flex flex-col space-y-section px-section">
        <div className="flex flex-col ">
          <h4 className="font-bold">Course Details:</h4>
          <div className="flex space-x-2">
            {" "}
            <Link
              href={`/dashboard/courses/${round?.courseId}`}
              className="underline"
            >
              {round?.course?.name}
            </Link>
            <p>Par {coursePar == 0 ? "N/A" : coursePar}</p>
          </div>
        </div>
        {scoresByGolfer?.map((score) => (
          <div key={score.golferId}>
            <div>
              <strong>{score.name}</strong>
            </div>
            <div>Total: {score.total}</div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex w-full px-section pb-section">
        <Button className="w-full" onClick={handleRestart}>
          Back to Holes?
        </Button>
      </div>
    </DetailScreenLayout>
  );
};
