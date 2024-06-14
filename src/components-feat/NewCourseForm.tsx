"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { DrawerTrigger } from "@/components/ui/drawer";
import { courseInsertSchema } from "@/server/db/schema";
import { api } from "@/trpc/react";

export const NewCourseForm = ({
  defaultValues,
}: {
  defaultValues?: z.infer<typeof courseInsertSchema>;
  onSave?: () => void;
}) => {
  const utils = api.useUtils();
  const form = useForm<z.infer<typeof courseInsertSchema>>({
    resolver: zodResolver(courseInsertSchema),
    defaultValues: {
      ...defaultValues,
      name: defaultValues?.name,
      holes: defaultValues?.holes ?? 18,
    },
  });

  const { mutate, isPending, isError, isSuccess } =
    api.course.createCourse.useMutation({
      onSettled: async () => {
        await utils.course.invalidate();
        setTimeout(() => {
          triggerRef.current?.click();
        }, 500);
      },
    });

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  function onSubmit(data: z.infer<typeof courseInsertSchema>) {
    mutate(data);
  }

  React.useEffect(() => {
    return () => {
      form.reset();
    };
  }, [form]);

  return (
    <div className="flex min-h-[250px] flex-col space-y-6 px-6 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full w-full flex-1 flex-grow flex-col space-y-8"
        >
          <div className="flex flex-grow flex-col space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-[17px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="holes"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Number of Holes</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(n: string) =>
                        field.onChange(parseInt(n, 10))
                      }
                      defaultValue={String(field.value) ?? "18"}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"9"} />
                        </FormControl>
                        <FormLabel className="font-normal">9</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="18" />
                        </FormControl>
                        <FormLabel className="font-normal">18</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DrawerTrigger ref={triggerRef}></DrawerTrigger>
          <Button
            disabled={!form.formState.isValid || isPending}
            type="submit"
            className="flex-shrink-0 disabled:opacity-60"
          >
            {isPending ? "Saving..." : isSuccess ? "Success!" : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
