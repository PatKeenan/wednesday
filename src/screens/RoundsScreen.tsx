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

import type { CourseSchema, RoundSchema } from "@/types";
import { NewRoundForm } from "@/components-feat/NewRoundForm";
import { SmallILogoLayout } from "@/layouts/SmallLogoLayout";

export const RoundsScreen = () => {
  /* const roundsQuery = api.c */

  /////////////////////////
  return (
    <SmallILogoLayout>
      <div className="h-full space-y-10 overflow-auto pt-8">
        <div className="px-section flex justify-between">
          <h2 className="mt-auto">Rounds</h2>
          <div className="flex">
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="w-full space-x-1">
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
        </div>

        <ul className="flex flex-grow flex-col gap-4">
          {/* {rounds.map((round) => (
          <RoundsCard key={round.id} {...round} />
        ))} */}
        </ul>
      </div>
    </SmallILogoLayout>
  );
};
