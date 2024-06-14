"use client";

import { DetailScreenLayout } from "@/layouts/DetailScreenLayout";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export const CourseDetailScreen = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();

  const { data: course, isLoading } = api.course.getCourse.useQuery({
    id: parseInt(id, 10),
  });

  const { mutate: deleteCourse } = api.course.deleteCourse.useMutation({
    onSettled() {
      router.push("/dashboard/courses");
    },
  });
  const handleDelete = async () => {
    if (!course) return;
    deleteCourse({ id: course.id });
  };

  return isLoading ? (
    <div className="grid h-full w-full place-items-center">Loading...</div>
  ) : (
    <DetailScreenLayout
      backLink="/dashboard/courses"
      headerTitle={course?.name || "Course"}
      onDeleteClick={handleDelete}
    >
      <div>
        Holes:
        <p>{course?.holes}</p>
      </div>
    </DetailScreenLayout>
  );
};
