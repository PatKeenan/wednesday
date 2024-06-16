import React from "react";

import { PlusIcon } from "@radix-ui/react-icons";
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

import { NewCourseForm } from "@/components-feat/NewCourseForm";
import { CoursesList } from "@/components-feat/CoursesList";

import { SmallILogoLayout } from "@/layouts/SmallLogoLayout";

export const CoursesScreen = async () => {
  /////////////////////////
  return (
    <SmallILogoLayout>
      <div className="flex flex-1 flex-grow flex-col overflow-hidden pt-8">
        <div className="px-section flex flex-shrink-0 justify-between pb-2">
          <h2 className="mt-auto">Courses</h2>
          <div className="flex">
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="w-full space-x-1">
                  <PlusIcon className="-ml-3 h-5 w-5" />
                  <span>New Course</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="pb-4">
                <DrawerHeader>
                  <DrawerTitle>New Course</DrawerTitle>
                </DrawerHeader>

                <NewCourseForm />

                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="ghost">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="border-t-foreground/10 flex flex-grow flex-col overflow-hidden ">
          <CoursesList />
        </div>
      </div>
    </SmallILogoLayout>
  );
};
