"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { roundSchema } from "@/types";

import type { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const RoundsNewScreen = () => {
  const formSchema = roundSchema.omit({ id: true });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      completed: false,
      golfers: [],
      scores: [],
      status: "pending",
      date: new Date().toDateString(),
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-full flex-col space-y-6">
        <h2>New Round</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-1 flex-grow flex-col space-y-8 pb-8"
          >
            <div className="flex-grow">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormDescription>When is the round?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={!form.formState.isValid}
              type="submit"
              className="disabled:opacity-60"
            >
              Save Round
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
