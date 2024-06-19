import { RoundStatus as RoundStatusType } from "@/lib/utils";
import * as React from "react";

const statusColors: Record<RoundStatusType, string> = {
  Booked: "bg-orange-200/20 text-orange-800/80 border-orange-400/80",
  "In-progress": "bg-blue-200/20 text-blue-800/80 border-blue-400/80",
  Completed: "bg-green-200/20 text-green-800/80 border-green-400/80",
  Canceled: "bg-red-200/20 text-red-800/80 border-red-400/80",
  Pending: "bg-yellow-200/20 text-yellow-800/80 border-yellow-400/80",
  Paused: "bg-gray-200/20 text-gray-800/80 border-gray-400/80",
};

export const RoundStatus = ({ status }: { status: RoundStatusType }) => {
  return (
    <div
      className={`flex-grow-0 rounded-full border px-4 py-0.5 text-xs font-medium uppercase ${statusColors[status]}`}
    >
      {status}
    </div>
  );
};
