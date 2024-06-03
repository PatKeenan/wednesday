import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import type { Round } from "@/types";

export const RoundsScreen = () => {
  const rounds: Round[] = [
    {
      date: "Wed 6/19/24",
      id: "",
      golfers: [],
      scores: [],
      course: {
        holes: [],
        name: "Cream Ridge",
        id: "1",
      },
    },
  ];

  /////////////////////////
  return (
    <div className="h-full space-y-10 overflow-auto pt-8">
      <div className="flex justify-between">
        <h2 className="mt-auto">Rounds</h2>
        <Button className="space-x-1" asChild>
          <Link href="/dashboard/golfers/new">
            <PlusIcon className="-ml-3 h-5 w-5" />
            <span>New</span>
          </Link>
        </Button>
      </div>
      <ul className="flex flex-grow flex-col gap-4">
        {rounds.map((round) => (
          <RoundsCard key={round.id} {...round} />
        ))}
      </ul>
    </div>
  );
};

export const RoundsCard = ({ golfers, course, date }: Round) => {
  return (
    <div>
      <time>
        {date} @{course.name}
      </time>
    </div>
  );
};
