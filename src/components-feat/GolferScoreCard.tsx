"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { type GolferSelect } from "@/server/db/schema";
import { api } from "@/trpc/react";

type GolferScoreCardProps = {
  golfer: Pick<GolferSelect, "id" | "name">;
  roundId: number;
  courseId: number;
  holeId?: number;
};

export const GolferScoreCard: React.FC<GolferScoreCardProps> = ({
  golfer,
  holeId,
  roundId,
}) => {
  const { data: score, refetch } = api.score.getHoleScoreForGolfer.useQuery({
    golferId: golfer.id,
    roundId: roundId,
    holeId: holeId ?? -1,
  });
  const utils = api.useUtils();
  const { mutate } = api.score.upsertScore.useMutation({
    onMutate({ id, strokes, putts, drive, ...variables }) {
      const prevValues = utils.score.getHoleScoreForGolfer.getData({
        golferId: variables.golferId,
        roundId: variables.roundId,
        holeId: variables.holeId,
      });

      if (id) {
        utils.score.getHoleScoreForGolfer.setData(
          {
            golferId: variables.golferId,
            roundId: variables.roundId,
            holeId: variables.holeId,
          },
          {
            id,
            strokes: strokes ?? null,
            putts: putts ?? null,
            drive: drive ?? null,
            ...variables,
          },
        );
      }
      return prevValues;
    },
    onSettled: async () => {
      await refetch();
    },
  });

  const handleUpdateDrive = (value: string) => {
    console.log("value", value);
    if (!holeId) {
      console.error("No holeId provided.");
      return;
    }
    mutate({
      ...score,
      golferId: golfer.id,
      roundId: roundId,
      holeId: holeId,
      drive: value,
    });
  };

  const handleIncreaseStrokes = () => {
    if (!holeId) {
      console.error("No holeId provided.");
      return;
    }
    mutate({
      ...score,
      golferId: golfer.id,
      roundId: roundId,
      holeId: holeId,
      strokes: score?.strokes ? score.strokes + 1 : 1,
    });
  };

  const handleDecreaseStrokes = () => {
    if (!holeId) {
      console.error("No holeId provided.");
      return;
    }

    mutate({
      ...score,
      golferId: golfer.id,
      roundId: roundId,
      holeId: holeId,
      strokes: score?.strokes ? score.strokes - 1 : 0,
    });
  };

  const handleIncreasePutts = () => {
    if (!holeId) {
      console.error("No holeId provided.");
      return;
    }
    mutate({
      ...score,
      golferId: golfer.id,
      roundId: roundId,
      holeId: holeId,
      putts: score?.putts ? score.putts + 1 : 1,
    });
  };

  const handleDecreasePutts = () => {
    if (!holeId) {
      console.error("No holeId provided.");
      return;
    }
    mutate({
      ...score,
      golferId: golfer.id,
      roundId: roundId,
      holeId: holeId,
      putts: score?.putts ? score.putts - 1 : 0,
    });
  };

  return (
    <React.Fragment>
      <AccordionItem
        value={golfer.id.toString()}
        className="col-span-8 w-full space-y-4 rounded-md bg-white px-3 py-0"
      >
        <AccordionTrigger className="space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-200">
            <span>{golfer.name[0]}</span>
          </div>

          <h3 className="font-normal">{golfer.name}</h3>
          <div className="flex-grow"></div>
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-8 items-center gap-y-4">
          <h4 className="col-span-3 text-lg">Drive</h4>
          <div className="col-span-5 col-start-4">
            <RadioGroup
              defaultValue={score?.drive ?? undefined}
              className="flex justify-between"
              onValueChange={(e) => handleUpdateDrive(e)}
            >
              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem
                  value="left"
                  id="left"
                  checked={score?.drive == "left"}
                />
                <Label htmlFor="r1" className="font-light">
                  Left
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem
                  value="center"
                  id="center"
                  checked={score?.drive == "center"}
                />
                <Label htmlFor="r1" className="font-light">
                  Center
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem
                  value="right"
                  id="right"
                  checked={score?.drive == "right"}
                />
                <Label htmlFor="r1" className="font-light">
                  Right
                </Label>
              </div>
            </RadioGroup>
          </div>
          <h4 className="col-span-3 text-lg">Strokes</h4>
          <div className="col-span-5 col-start-4 flex">
            <Button
              size="icon"
              variant="secondary"
              onClick={handleDecreaseStrokes}
            >
              <MinusIcon className="h-5 w-5 text-slate-600" />
            </Button>
            <div className="flex flex-grow items-center justify-center text-lg">
              {score?.strokes ?? 0}
            </div>
            <Button
              size="icon"
              variant="secondary"
              onClick={handleIncreaseStrokes}
            >
              <PlusIcon className="h-5 w-5 text-slate-600" />
            </Button>
          </div>
          <h4 className="col-span-3 text-lg">Putts</h4>
          <div className="col-span-5 col-start-4 flex">
            <Button
              size="icon"
              variant="secondary"
              onClick={handleDecreasePutts}
            >
              <MinusIcon className="h-5 w-5 text-slate-600" />
            </Button>
            <div className="flex flex-grow items-center justify-center text-lg">
              {score?.putts ?? 0}
            </div>
            <Button size="icon" variant="secondary">
              <PlusIcon
                className="h-5 w-5 text-slate-600"
                onClick={handleIncreasePutts}
              />
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
      <div className="col-span-2">
        <div
          className="relative flex aspect-square h-[64] w-[64] items-center justify-center rounded-full bg-gray-400"
          onClick={handleIncreaseStrokes}
        >
          <button className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-full">
            <span className="text-lg text-white">{score?.strokes ?? 0}</span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
