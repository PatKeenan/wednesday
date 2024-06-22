"use client";

import { DetailScreenLayout } from "@/layouts/DetailScreenLayout";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import * as React from "react";

export const GolferDetailScreen = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();

  const { data: golfer, isLoading } = api.golfer.getGolfer.useQuery({
    id: parseInt(id, 10),
  });

  const { mutate: deleteCourse } = api.course.deleteCourse.useMutation({
    onSettled() {
      router.back();
    },
  });
  const handleDelete = async () => {
    if (!golfer) return;
    deleteCourse({ id: golfer.id });
  };

  return isLoading ? (
    <div className="grid h-full w-full place-items-center">Loading...</div>
  ) : (
    <DetailScreenLayout
      headerTitle={golfer?.name ?? "Course"}
      onDeleteClick={handleDelete}
    >
      <div className="px-section">
        <h3>{golfer?.name}</h3>
      </div>
    </DetailScreenLayout>
  );
};
