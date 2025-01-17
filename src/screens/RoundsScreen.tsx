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
import { SmallILogoLayout } from "@/layouts/SmallLogoLayout";
import { RoundsList } from "@/components-feat/RoundsList";

export const RoundsScreen = () => {
  /* const roundsQuery = api.c */

  /////////////////////////
  return (
    <SmallILogoLayout>
      <div className="h-full space-y-10 pt-8">
        <div className="flex justify-between px-section">
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

        <RoundsList />
      </div>
    </SmallILogoLayout>
  );
};
