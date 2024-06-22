"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

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
import { golferInsertSchema } from "@/server/db/schema";
import { api } from "@/trpc/react";

export const NewGolferForm = ({
  defaultValues,
}: {
  defaultValues?: z.infer<typeof golferInsertSchema>;
  onSave?: () => void;
}) => {
  const utils = api.useUtils();
  const form = useForm<z.infer<typeof golferInsertSchema>>({
    resolver: zodResolver(golferInsertSchema),
    defaultValues: {
      ...defaultValues,
      name: defaultValues?.name,
    },
  });

  // TODO: handle errors
  const { mutate, isPending, isSuccess } = api.golfer.createGolfer.useMutation({
    onSettled: async () => {
      await utils.golfer.invalidate();
      setTimeout(() => {
        triggerRef.current?.click();
      }, 500);
    },
  });

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  function onSubmit(data: z.infer<typeof golferInsertSchema>) {
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
