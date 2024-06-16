"use client";

import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/trpc/react";
import Link from "next/link";
import React from "react";

export const CoursesList = () => {
  const {
    data: coursesQuery,
    isLoading,
    isError,
    refetch,
  } = api.course.getCourses.useQuery();

  console.log(coursesQuery);
  if (isError) {
    return (
      <div className="grid h-full w-full place-items-center">
        <div className="flex flex-col space-y-2">
          <p>Error loading courses</p>
          <Button variant="outline" onClick={() => refetch()}>
            try again?
          </Button>
        </div>
      </div>
    );
  }
  return isLoading ? (
    <div className="grid h-full w-full animate-pulse place-items-center">
      Loading Courses...
    </div>
  ) : (
    <ScrollArea className="px-section">
      <ul className="flex flex-col gap-3 py-3">
        {coursesQuery?.map((course) => (
          <Link key={course.id} href={`/dashboard/courses/${course.id}`}>
            <CourseCard {...course} />
          </Link>
        ))}
      </ul>
    </ScrollArea>
  );
};
