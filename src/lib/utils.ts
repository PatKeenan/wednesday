import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const localDate = new Date(
    (date as unknown as number) - date.getTimezoneOffset() * 60000,
  ); //offset in milliseconds. Credit https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset

  // Optionally remove second/millisecond if needed
  localDate.setSeconds(0);
  localDate.setMilliseconds(0);

  // Format the date to match Jun 1, 2021 @ 11:15 AM
  const pretty = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return {
    localDate,
    formatted: localDate.toISOString().slice(0, -1),
    pretty,
  };
}

export const roundStatuses = [
  "Pending",
  "Completed",
  "Canceled",
  "In-progress",
  "Booked",
  "Paused",
] as const;
export type RoundStatus = (typeof roundStatuses)[number];
export const isRoundStatusType = (status: unknown): status is RoundStatus => {
  return (
    typeof status === "string" && roundStatuses.includes(status as RoundStatus)
  );
};
