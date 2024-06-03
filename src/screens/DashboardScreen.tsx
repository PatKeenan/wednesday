import Image from "next/image";
import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import type { Round } from "@/types";

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

export const DashboardScreen = () => {
  // TODO: getRounds
  // TODO: getGolfers

  return (
    <div className="flex flex-1 flex-grow flex-col">
      <Image
        priority
        src="/wed-gc.jpg"
        alt="wed-gc"
        height={200}
        width={200}
        className="mx-auto h-[200px] w-auto flex-shrink-0"
      />
      <div className="flex flex-1 flex-grow flex-col space-y-10">
        <div className="flex">
          <Button className="h-12 w-full space-x-1" asChild>
            <Link href="/dashboard/rounds/new">
              <PlusIcon className="-ml-3 h-5 w-5" />
              <span>New Round</span>
            </Link>
          </Button>
        </div>
        <div className="flex flex-grow-0 flex-col space-y-1">
          <h3>Rounds</h3>
          <ul className="min-h-[75px] space-y-0.5 font-light">
            {rounds.map((round) => (
              <div key={round.id} className="flex space-x-4">
                <time>
                  {round.date} @ {round.course.name}
                </time>
                <div className="bg-accent/20 border-accent/40 flex items-center justify-center rounded-full border px-4 py-0.5 text-xs text-red-800">
                  <span>UPCOMING</span>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="flex flex-grow-0 flex-col space-y-1">
          <h3>Golfers</h3>
          <ul className="min-h-[75px] space-y-0.5 overflow-auto font-light">
            {rounds.map((round) => (
              <div key={round.id}>
                <time>
                  {round.date} @ {round.course.name}
                </time>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
