"use client";

import { useState, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { placesFormSchema } from "@/lib/validator";
import { placesDefaultValues } from "@/constants";

const initialValues = placesDefaultValues;

const form = useForm<z.infer<typeof placesFormSchema>>({
  resolver: zodResolver(placesFormSchema),
  defaultValues: initialValues,
});

async function onSubmit(values: z.infer<typeof placesFormSchema>) {
  console.log(values);
}

const PlacesForm = () => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      ></form>
    </Form>
  );
};
