"use client";

import { RoundStatus } from "@/components/RoundStatus";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate, isRoundStatusType } from "@/lib/utils";
import { type RoundSelectWithCourseAndGolfers } from "@/server/db/schema";
import { api } from "@/trpc/react";
import Link from "next/link";
import React from "react";

export const RoundsList = () => {
  const {
    data: roundsQuery,
    isLoading,
    isError,
    refetch,
  } = api.round.getRounds.useQuery();

  if (isError) {
    return (
      <div className="grid h-full w-full place-items-center">
        <div className="flex flex-col space-y-2">
          <p>Error loading Rounds</p>
          <Button variant="outline" onClick={() => refetch()}>
            try again?
          </Button>
        </div>
      </div>
    );
  }
  return isLoading ? (
    <div className="grid h-full w-full animate-pulse place-items-center">
      Loading Rounds...
    </div>
  ) : (
    <ScrollArea className="px-section">
      <ul className="flex flex-col gap-3 py-3">
        {roundsQuery?.length === 0 && (
          <p className="text-center">No rounds found</p>
        )}
        {roundsQuery?.map((round) => (
          <Link key={round.id} href={`/dashboard/rounds/${round.id}`}>
            <RoundsCard {...round} />
          </Link>
        ))}
      </ul>
    </ScrollArea>
  );
};

const RoundsCard = ({
  date,
  id,
  ...round
}: RoundSelectWithCourseAndGolfers) => {
  const roundStatus = React.useMemo(
    () => (isRoundStatusType(round.status) ? round.status : "Pending"),
    [round.status],
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex w-full items-center justify-between">
          <p>{round.course?.name}</p>
          <div>
            <RoundStatus status={roundStatus} />
          </div>
        </CardTitle>
        <CardDescription className="space-y-2">
          <time>{formatDate(date).pretty}</time>
          <p className="font-regular">
            <span className="font-medium">Golfers: </span>{" "}
            {round.golfers?.map((l) => l.golfer.name).join(", ")}
          </p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
