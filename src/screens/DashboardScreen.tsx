import Image from "next/image";
import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import type { Round } from "@/types";
import { Badge } from "@/components/ui/badge";
import { RoundStatus } from "@/components/RoundStatus";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { NewRoundForm } from "@/components-feat/NewRoundForm";

const rounds: Round[] = [
  {
    date: "Wed 6/19/24",
    id: "",
    golfers: [],
    scores: [],
    status: "upcoming",
    course: {
      holes: [],
      name: "Cream Ridge",
      id: "1",
    },
  },
  {
    date: "Wed 5/28/24",
    id: "",
    golfers: [],
    scores: [],
    status: "completed",
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
        src="/wed-gc-no-bg.png"
        alt="wed-gc"
        height={200}
        width={200}
        className="mx-auto h-[200px] w-auto flex-shrink-0"
      />
      <div className="flex flex-1 flex-grow flex-col space-y-10">
        <div className="flex">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="h-12 w-full space-x-1">
                <PlusIcon className="-ml-3 h-5 w-5" />
                <span>New Round</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="pb-4">
              <DrawerHeader>
                <DrawerTitle>New Round</DrawerTitle>
              </DrawerHeader>
              <NewRoundForm />
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="ghost">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="flex flex-grow-0 flex-col space-y-1">
          <h3>Rounds</h3>
          <ul className="min-h-[75px] space-y-2 font-light">
            {rounds.map((round) => (
              <div key={round.id} className="flex space-x-4">
                <time>
                  {round.date} @ {round.course.name}
                </time>
                <div>
                  {round.status && <RoundStatus status={round.status} />}
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="flex flex-grow-0 flex-col space-y-1">
          <h3>Golfers</h3>
          <ul className="min-h-[75px] space-y-2 overflow-auto font-light">
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