import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export const GolfersScreen = () => {
  const golfers = [
    { name: "Alex Fox", id: "1" },
    { name: "Chris Barba", id: "2" },
    { name: "Pat Keenan", id: "3" },
  ];
  return (
    <div className="h-full space-y-10 overflow-auto pt-8">
      <div className="flex justify-between">
        <h2 className="mt-auto">Golfers</h2>
      </div>
      <ul className="flex flex-grow flex-col gap-4">
        {golfers.map((golfer) => (
          <GolferCard key={golfer.name} name={golfer.name} id={golfer.id} />
        ))}
      </ul>
    </div>
  );
};

const GolferCard = ({ name, id }: { name: string; id: string }) => {
  return (
    <div className="border-foreground/20 flex h-[60px] items-center justify-center rounded-lg border bg-white/80 text-sm font-semibold">
      <p>{name}</p>
    </div>
  );
};
