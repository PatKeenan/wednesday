import React from "react";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import type { Course } from "@/types";
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

export const CoursesScreen = () => {
  const courses: Course[] = [
    {
      holes: [],
      name: "Cream Ridge",
      id: "1",
    },
  ];
  /////////////////////////
  return (
    <div className="h-full space-y-10 overflow-auto pt-8">
      <div className="flex justify-between">
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
      <ul className="flex flex-grow flex-col gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </ul>
    </div>
  );
};

export const CourseCard = ({ name }: Course) => {
  return (
    <div>
      <time>@{name}</time>
    </div>
  );
};
