import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import type { Course } from "@/types";

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
        <Button className="space-x-1" asChild>
          <Link href="/dashboard/golfers/new">
            <PlusIcon className="-ml-3 h-5 w-5" />
            <span>New</span>
          </Link>
        </Button>
      </div>
      <ul className="flex flex-grow flex-col gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </ul>
    </div>
  );
};

export const CourseCard = ({ id, name }: Course) => {
  return (
    <div>
      <time>@{name}</time>
    </div>
  );
};
