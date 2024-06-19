import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

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
import { RoundsList } from "@/components-feat/RoundsList";
import { GolfersList } from "@/components-feat/GolfersList";

export const DashboardScreen = () => {
  return (
    <div className="h-full overflow-auto">
      <Image
        priority
        src="/wed-gc-no-bg.png"
        alt="wed-gc"
        height={200}
        width={200}
        className="mx-auto h-[200px] w-auto flex-shrink-0 "
      />
      <div className="space-y-10">
        <div className="flex px-section">
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
        <div className="mb-4">
          <div className="space-y-1">
            <h3 className="pl-section">Rounds</h3>
            <RoundsList />
          </div>
          <div className="space-y-1">
            <h3 className="pl-section">Golfers</h3>
            <GolfersList />
          </div>
        </div>
      </div>
    </div>
  );
};
