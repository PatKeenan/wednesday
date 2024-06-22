"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon, GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export const SettingsButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="focus-visible:ring-transparent">
          <DotsHorizontalIcon className="w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={0} align="start" alignOffset={-60}>
        <DropdownMenuItem>
          <Link
            href="/dashboard/settings"
            className="flex w-full items-center space-x-3"
          >
            <GearIcon className="h-[20px] w-[20px]" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
