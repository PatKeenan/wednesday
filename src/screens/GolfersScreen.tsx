import { GolferCard } from "@/components/GolferCard";
import { SmallILogoLayout } from "@/layouts/SmallLogoLayout";
import React from "react";

export const GolfersScreen = () => {
  const golfers = [
    { name: "Alex Fox", id: "1" },
    { name: "Chris Barba", id: "2" },
    { name: "Pat Keenan", id: "3" },
  ];
  return (
    <SmallILogoLayout>
      <div className="px-section h-full space-y-10 overflow-auto pt-8">
        <div className="flex justify-between">
          <h2 className="mt-auto">Golfers</h2>
        </div>
        <ul className="flex flex-grow flex-col gap-4">
          {golfers.map((golfer) => (
            <GolferCard key={golfer.name} name={golfer.name} id={golfer.id} />
          ))}
        </ul>
      </div>
    </SmallILogoLayout>
  );
};
