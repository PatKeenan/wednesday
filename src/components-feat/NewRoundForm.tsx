"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { RoundSchema } from "@/types";

import type { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  roundInsertSchema,
  roundInsertWithGolfersSchema,
} from "@/server/db/schema";
import { api } from "@/trpc/react";

function formatDate(date: Date) {
  const localDate = new Date(
    (date as unknown as number) - date.getTimezoneOffset() * 60000,
  ); //offset in milliseconds. Credit https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset

  // Optionally remove second/millisecond if needed
  localDate.setSeconds(0);
  localDate.setMilliseconds(0);
  return {
    localDate,
    formatted: localDate.toISOString().slice(0, -1),
  };
}

export const NewRoundForm = ({
  defaultValues,
}: {
  defaultValues?: RoundSchema;
}) => {
  const { data, isLoading, isError } =
    api.course.getNewRoundFormOptions.useQuery();

  const { golfers, courses } = React.useMemo(
    () => ({
      golfers: data?.golfers ?? [],
      courses: data?.courses ?? [],
    }),
    [data],
  );

  const golferIds = React.useMemo(
    () => golfers.map(({ id }) => ({ id })) ?? [],
    [golfers],
  );

  const { mutate } = api.round.createRound.useMutation();

  const form = useForm<z.infer<typeof roundInsertWithGolfersSchema>>({
    resolver: zodResolver(roundInsertWithGolfersSchema),
    defaultValues: {
      ...defaultValues,
      completed: defaultValues?.completed ?? false,
      numHoles: defaultValues?.numHoles ?? 18,
      golferIds: golferIds,
      status: defaultValues?.status ?? "pending",
      date: defaultValues?.date ?? formatDate(new Date()).localDate,
    },
  });

  const onSubmit = (data: z.infer<typeof roundInsertWithGolfersSchema>) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-[450px] flex-col space-y-6 px-6 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full w-full flex-1 flex-grow flex-col space-y-8"
        >
          <div className="flex flex-grow flex-col space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => {
                const { value, onChange, ...fieldRest } = field;
                return (
                  <FormItem>
                    <FormLabel>Date & Time</FormLabel>
                    <FormControl>
                      <Input
                        value={formatDate(value).formatted}
                        onChange={(e) => onChange(new Date(e.target.value))}
                        type="datetime-local"
                        className="focus:text-[20px]"
                        {...fieldRest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="grid grid-cols-6 gap-x-4">
              <FormField
                control={form.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(
                            courses?.find((c) => c.id === parseInt(value, 10))
                              ?.id || null,
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Course Name ..." />
                        </SelectTrigger>
                        <SelectContent>
                          {courses?.map((course) => (
                            <SelectItem
                              key={course.id}
                              value={course.id.toString()}
                            >
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numHoles"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Holes</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={9}
                        className="focus:text-[17px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={"Booked"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Booked">Booked</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="golferIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Golfers</FormLabel>
                  <div className="space-y-3">
                    {golfers?.map((golfer) => (
                      <FormItem
                        key={golfer.name}
                        className="flex flex-row items-start space-x-3 space-y-0.5"
                      >
                        <FormControl>
                          <Checkbox
                            className="h-5 w-5"
                            checked={
                              field &&
                              field.value?.some((g) => g.id === golfer.id)
                            }
                            onCheckedChange={(checked) => {
                              if (!field) return;
                              const golferFormatted = { id: golfer.id };
                              return checked
                                ? field.onChange([
                                    ...(field?.value || []),
                                    golferFormatted,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (g) => g.id !== golfer.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="my-auto">{golfer.name}</FormLabel>
                      </FormItem>
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button
            /* disabled={!form.formState.isValid} */

            type="submit"
            className="flex-shrink-0 disabled:opacity-60"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};
