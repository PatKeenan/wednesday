"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GolferSelect } from "@/server/db/schema";
import { api } from "@/trpc/react";
import Link from "next/link";
import React from "react";

export const GolfersList = () => {
  const {
    data: golfersQuery,
    isLoading,
    isError,
    refetch,
  } = api.golfer.getGolfers.useQuery();

  if (isError) {
    return (
      <div className="grid h-full w-full place-items-center">
        <div className="flex flex-col space-y-2">
          <p>Error loading golfers</p>
          <Button variant="outline" onClick={() => refetch()}>
            try again?
          </Button>
        </div>
      </div>
    );
  }
  return isLoading ? (
    <div className="grid h-full w-full animate-pulse place-items-center">
      Loading Courses...
    </div>
  ) : (
    <ScrollArea className="px-section">
      <ul className="flex flex-col gap-3 py-3">
        {golfersQuery?.map((golfer) => (
          <Link key={golfer.id} href={`/dashboard/golfers/${golfer.id}`}>
            <GolferCard {...golfer} />
          </Link>
        ))}
      </ul>
    </ScrollArea>
  );
};

const GolferCard = ({ name, id }: GolferSelect) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
    </Card>
  );
};
