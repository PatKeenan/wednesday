"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChevronLeftIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

type DetailScreenLayoutProps = {
  children: React.ReactNode;
  headerTitle: string;
  backLink: "/dashboard" | `/dashboard/${string | number}`;
  onDeleteClick?: () => void;
};

export const DetailScreenLayout: React.FC<DetailScreenLayoutProps> = ({
  children,
  headerTitle,
  backLink,
  onDeleteClick,
}) => {
  return (
    <div className="h-full flex-auto flex-col">
      <div className="border-foreground/10 absolute left-0 right-0 flex h-12 items-center justify-center border-b">
        <div className="flex w-1/5 flex-shrink-0 justify-start">
          <Button asChild variant="ghost">
            <Link href={backLink}>
              <ChevronLeftIcon className="-ml-1.5 h-5 w-5" />
              Back
            </Link>
          </Button>
        </div>
        <div className="flex flex-grow justify-center text-center">
          <p className="text-lg font-semibold">{headerTitle}</p>
        </div>
        <div className="flex w-1/5 flex-shrink-0 flex-grow-0 overflow-hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="focus-visible:ring-transparent"
              >
                <DotsHorizontalIcon className="w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={0} align="start" alignOffset={-60}>
              <DropdownMenuItem>
                <button
                  className="text-foreground flex w-full items-center space-x-4"
                  onClick={onDeleteClick}
                >
                  <TrashIcon className="w-5" />
                  <span className="text-foreground text-sm">Delete</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-12 h-full flex-auto flex-grow flex-col pt-4">
        {children}
      </div>
    </div>
  );
};
