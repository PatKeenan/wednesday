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

import { courseSchema, type CourseSchema } from "@/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { numeric } from "drizzle-orm/pg-core";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";

export const NewCourseForm = ({
  defaultValues,
}: {
  defaultValues?: CourseSchema;
}) => {
  const formSchema = courseSchema.omit({ id: true, holes: true }).extend({
    numberOfHoles: z.string().default("18"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      name: defaultValues?.name,
      numberOfHoles:
        defaultValues?.holes && defaultValues?.holes?.length === 9 ? "9" : "18",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
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
              name="numberOfHoles"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Number of Holes</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
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
          <Button
            disabled={!form.formState.isValid}
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
