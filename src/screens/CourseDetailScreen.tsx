"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DetailScreenLayout } from "@/layouts/DetailScreenLayout";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  holeInsertSchema,
  type HoleSelect,
  type HolesInsert,
} from "@/server/db/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export const CourseDetailScreen = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();

  const {
    data: course,
    isLoading,
    refetch,
  } = api.course.getCourse.useQuery({
    id: parseInt(id, 10),
  });

  const { mutate: deleteCourse } = api.course.deleteCourse.useMutation({
    onSettled() {
      router.back();
    },
  });
  const handleDelete = async () => {
    if (!course) return;
    deleteCourse({ id: course.id });
  };

  const coursePar = React.useMemo(
    () =>
      course?.holes.reduce((acc, curr) => {
        return acc + (curr?.par || 0);
        return acc;
      }, 0),
    [course?.holes],
  );

  return isLoading ? (
    <div className="grid h-full w-full place-items-center">Loading...</div>
  ) : (
    <DetailScreenLayout
      backLink="/dashboard/courses"
      headerTitle={course?.name || "Course"}
      onDeleteClick={handleDelete}
    >
      <Tabs
        className="px-section flex w-full flex-1 flex-grow flex-col overflow-hidden py-2"
        defaultValue="overview"
      >
        <TabsList>
          <TabsTrigger value="overview">Details</TabsTrigger>
          <TabsTrigger value="holes">Holes</TabsTrigger>
          <TabsTrigger value="rounds">Rounds</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="overflow-scroll pt-3">
          <div className="flex flex-row items-center space-x-2">
            <h3>Holes:</h3>
            <p>{course?.holes.length}</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <h3>Par:</h3>
            <p>{coursePar}</p>
          </div>
        </TabsContent>
        <TabsContent
          value="holes"
          className="-mx-section flex flex-1 flex-grow flex-col overflow-auto"
        >
          <div className="space-y-2">
            <ScrollArea className="px-section mb-10 h-full flex-grow">
              <Accordion type="single" collapsible className="w-full">
                {course?.holes.map((hole) => (
                  <AccordionItem value={hole.id.toString()} key={hole.id}>
                    <AccordionTrigger>
                      <h3># {hole.holeNumber}</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Hole hole={hole} onSuccess={refetch} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </DetailScreenLayout>
  );
};

type HoleProps = {
  hole: HoleSelect;
  onSuccess?: () => void;
};

const Hole: React.FC<HoleProps> = ({ hole, onSuccess }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const { par, yards, description } = hole;
  const { mutate, isPending, isSuccess, isError } =
    api.holes.updateHole.useMutation({
      onSettled() {
        onSuccess?.();
        setTimeout(() => {
          setIsEditing(false);
        }, 750);
      },
    });

  const handleSubmit = (data: HolesInsert) => {
    mutate({
      ...hole,
      par: data.par || 0,
      yards: data.yards || 0,
      description: data.description || "",
    });
  };

  const form = useForm<HolesInsert>({
    resolver: zodResolver(holeInsertSchema),
    defaultValues: {
      ...hole,
      par: par || 0,
      yards: yards || 0,
      description: description || "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2 py-1">
            <h4 className="font-bold">Par:</h4>
            {isEditing ? (
              <FormField
                control={form.control}
                name="par"
                render={({ field }) => {
                  const { value, onChange, ...fieldRest } = field;
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          value={value || 0}
                          onChange={(e) =>
                            form.setValue("par", parseInt(e.target.value, 10))
                          }
                          type="number"
                          {...fieldRest}
                          className="w-[80px] focus:text-[17px]"
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            ) : (
              <p className="flex min-h-9 min-w-[80px] items-center">
                {par || "unset"}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2 py-1">
            <h4 className="font-bold">Yards:</h4>
            {isEditing ? (
              <FormField
                control={form.control}
                name="yards"
                render={({ field }) => {
                  const { value, onChange, ...fieldRest } = field;
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          value={value || 0}
                          onChange={(e) =>
                            form.setValue("yards", parseInt(e.target.value, 10))
                          }
                          type="number"
                          {...fieldRest}
                          className="w-[100px] focus:text-[17px]"
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            ) : (
              <p className="flex min-h-9 min-w-[100px] items-center">
                {yards || "n/a"}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2 py-1">
          <h4 className="font-bold">Description:</h4>
          {isEditing ? (
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                const { value, ...fieldRest } = field;
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        value={value || ""}
                        {...fieldRest}
                        className="w-full bg-white focus:text-[17px] "
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          ) : (
            <p>{description || "n/a"}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex w-full items-center space-x-4 pt-4">
            <Button
              size="sm"
              className="flex-grow"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              type="button"
              className="border-foreground/40"
              onClick={() => setIsEditing(false)}
            >
              x
            </Button>
          </div>
        )}
      </form>
      {!isEditing && (
        <div className="mt-2 flex w-full">
          <Button
            size="sm"
            onClick={() => setIsEditing(true)}
            type="button"
            variant="outline"
            className="border-foreground/40 w-full"
          >
            Edit
          </Button>
        </div>
      )}
    </Form>
  );
};
