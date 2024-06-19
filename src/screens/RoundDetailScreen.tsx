"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { DetailScreenLayout } from "@/layouts/DetailScreenLayout";
import { formatDate, type RoundStatus as RoundStatusType } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";

import { ActiveRoundStepper } from "@/components-feat/ActiveRoundStepper";
import { RoundSummary } from "@/components-feat/RoundSummary";
import Link from "next/link";
import { RoundStatus } from "@/components/RoundStatus";

export const RoundDetailScreen = ({ params }: { params: { id: string } }) => {
  const [isActive, setIsActive] = React.useState(false);
  const [currentHole, setCurrentHole] = React.useState(1);

  const id = params.id;
  const router = useRouter();
  const { data, isLoading, isError, refetch } = api.round.getRound.useQuery({
    id: parseInt(id, 10),
    withHoles: true,
  });
  const { mutate: updateRound } = api.round.updateRound.useMutation();
  const { mutate } = api.round.deleteRound.useMutation({
    onSettled() {
      router.back();
    },
  });

  const handleDelete = () => {
    if (!data) return;
    mutate({ id: data?.id });
  };

  const handleStartRound = () => {
    if (!data) {
      return;
    }
    updateRound({
      ...data,
      status: "in-progress",
      inProgress: true,
      currentHole: data.currentHole ?? 1,
    });
    setIsActive(true);
    setCurrentHole(data.currentHole ?? 1);
  };

  const handleNextHole = () => {
    if (!data) {
      return;
    }

    if (currentHole < (data?.numHoles ?? 18)) {
      setCurrentHole(currentHole + 1);
      updateRound({
        ...data,
        currentHole: currentHole + 1,
      });
    }
    return;
  };

  const handlePrevHole = () => {
    if (!data) {
      return;
    }
    if (currentHole > 1) {
      setCurrentHole(currentHole - 1);
      updateRound({
        ...data,
        currentHole: currentHole - 1,
      });
    }
    return;
  };

  const handleEndRound = async (status?: RoundStatusType) => {
    if (!data) {
      return;
    }

    if (status == "Paused") {
      updateRound({
        ...data,
        status: status ?? "Paused",
        currentHole: currentHole,
        inProgress: false,
      });
    }

    if (status == "Completed") {
      updateRound({
        ...data,
        status: status ?? "Completed",
        completed: true,
        inProgress: false,
        currentHole: currentHole,
      });
    }
    await refetch();
    setIsActive(false);
  };

  React.useEffect(() => {
    if (data?.inProgress && data?.status === "In-progress") {
      setIsActive(true);
      setCurrentHole(data.currentHole ?? 1);
      return;
    }

    if (
      data?.inProgress &&
      !data?.completed &&
      data?.status !== "In-progress"
    ) {
      setCurrentHole(data?.currentHole ?? 1);
      return;
    }

    if (data?.completed && data?.status === "Completed") {
      setIsActive(false);
    }
  }, [data?.inProgress, data?.status, data?.currentHole, data?.completed]);

  const coursePar = React.useMemo(
    () =>
      data?.course?.holes.reduce((acc, curr) => {
        return acc + (curr?.par ?? 0);
        return acc;
      }, 0),
    [data?.course?.holes],
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data?.completed && data?.status === "Completed") {
    return <RoundSummary round={data} />;
  }

  return isActive && data ? (
    <ActiveRoundStepper
      round={data}
      currentHole={currentHole}
      handleEndRound={handleEndRound}
      handleNextHole={handleNextHole}
      handlePrevHole={handlePrevHole}
    />
  ) : (
    <DetailScreenLayout
      headerTitle="Round Details"
      onDeleteClick={handleDelete}
    >
      <div className="flex flex-col space-y-section px-section">
        <div>
          <h2>Overview</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium">Course:</h4>
              <Link
                href={`/dashboard/courses/${data?.courseId}`}
                className="underline"
              >
                {data?.course?.name}
              </Link>
              <p>
                {" "}
                {data?.course?.total_holes} holes, Par{" "}
                {coursePar == 0 ? "N/A" : coursePar}
              </p>
            </div>
            <div className="flex space-x-2">
              <h4 className="font-medium">Playing:</h4>
              <p className="mt-auto">{data?.numHoles} holes</p>
            </div>
            <div className="flex items-center space-x-2">
              <h4 className="font-medium">Date:</h4>
              <p>{formatDate(data?.date ?? new Date()).pretty}</p>
            </div>
            <div className="flex items-center space-x-2">
              <h4 className="font-medium">Status:</h4>
              <RoundStatus status={data?.status as RoundStatusType} />
            </div>
          </div>
        </div>
        <div>
          <h2>Golfers</h2>
          <div className="mt-4">
            <ul className="space-y-2">
              {data?.golfers.map((golfer) => (
                <li key={golfer.golfer_id}>
                  <Link
                    href={`/dashboard/golfers/${golfer.golfer_id}`}
                    className="underline"
                  >
                    {golfer.golfer?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Button onClick={handleStartRound}>
          {data?.status == "Paused" ? "Resume" : "Start"} Round
        </Button>
      </div>
    </DetailScreenLayout>
  );
};
