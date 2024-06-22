import { GolfersList } from "@/components-feat/GolfersList";
import { NewGolferForm } from "@/components-feat/NewGolferForm";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SmallILogoLayout } from "@/layouts/SmallLogoLayout";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

export const GolfersScreen = () => {
  return (
    <SmallILogoLayout>
      <div className="flex flex-1 flex-grow flex-col overflow-hidden pt-8">
        <div className="flex flex-shrink-0 justify-between px-section pb-2">
          <h2 className="mt-auto">Golfers</h2>
          <div className="flex">
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="w-full space-x-1">
                  <PlusIcon className="-ml-3 h-5 w-5" />
                  <span>New Golfer</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="pb-4">
                <DrawerHeader>
                  <DrawerTitle>New Golfer</DrawerTitle>
                </DrawerHeader>

                <NewGolferForm />

                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="ghost">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="flex flex-grow flex-col overflow-hidden border-t-foreground/10">
          <GolfersList />
        </div>
      </div>
    </SmallILogoLayout>
  );
};
