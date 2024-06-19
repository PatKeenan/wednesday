"use client";
import * as React from "react";
import { cn, type RoundStatus } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { Accordion } from "@/components/ui/accordion";

import type { RoundOutput } from "@/server/api/root";
import { GolferScoreCard } from "./GolferScoreCard";
export const ActiveRoundStepper = ({
  round,
  currentHole,
  handleEndRound,
  handleNextHole,
  handlePrevHole,
}: {
  currentHole: number;
  round: RoundOutput["getRound"];
  handleEndRound: (status?: RoundStatus) => void;
  handleNextHole: () => void;
  handlePrevHole: () => void;
}) => {
  if (!round) return null;

  const courseHole = round.course.holes.find(
    (hole) => hole.holeNumber === currentHole,
  );
  console.log("courseHole", courseHole);
  return (
    <div className="mt-2 flex h-full flex-auto flex-col px-section">
      <div className="space-y-3">
        <div className="mx-auto flex w-[90%] justify-evenly space-x-1.5">
          {Array.from({ length: round.numHoles ?? 18 }).map((_, item) => (
            <div
              key={`hole-${item}`}
              className={cn(
                item + 1 <= currentHole ? " bg-gray-500" : "bg-transparent",
                "h-3 w-3 rounded-full border border-gray-500",
              )}
            />
          ))}
        </div>
        <div className="flex w-full flex-grow items-center pt-1">
          <div>
            <Button
              size="icon"
              variant="ghost"
              disabled={currentHole <= 1}
              onClick={handlePrevHole}
            >
              <ChevronLeftIcon className="h-8 w-8" />
            </Button>
          </div>
          <div className="flex flex-grow justify-center">
            <h2 className="text-center">Hole {currentHole}</h2>
          </div>
          <div>
            <Button
              size="icon"
              variant="ghost"
              disabled={
                currentHole >=
                (round?.numHoles ?? round?.course?.total_holes ?? 18)
              }
              onClick={handleNextHole}
            >
              <ChevronRightIcon className="h-8 w-8" />
            </Button>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <p>Par {courseHole?.par ?? "n/a"}</p>
          <p>{courseHole?.yards ? `${courseHole?.yards} yds` : "n/a"}</p>
        </div>
      </div>
      <div className="mt-4 grid w-full grid-cols-10 gap-x-4">
        <div className="col-span-8 space-y-4">
          <h2 className="">Golfer</h2>
        </div>
        <h2 className="col-span-2">Score</h2>
      </div>

      <Accordion
        type="single"
        collapsible
        className="mt-6 grid w-full grid-cols-10 justify-start gap-x-4 gap-y-4"
        defaultValue={round.golfers[0]?.golfer_id.toString()}
      >
        {round.golfers.map(({ golfer }) => (
          <GolferScoreCard
            key={golfer.id}
            golfer={golfer}
            roundId={round.id}
            courseId={round.course.id}
            holeId={courseHole?.id}
          />
        ))}
      </Accordion>

      <div className="mx-auto mb-8 mt-auto flex w-full flex-col space-y-2">
        {currentHole !== round?.numHoles && (
          <Button onClick={() => handleNextHole()} className="w-full">
            Next Hole
          </Button>
        )}

        {currentHole === round?.numHoles && (
          <Button onClick={() => handleEndRound("Completed")}>Finish</Button>
        )}

        <Button variant="outline" onClick={() => handleEndRound("Paused")}>
          Pause
        </Button>
      </div>
    </div>
  );
};
