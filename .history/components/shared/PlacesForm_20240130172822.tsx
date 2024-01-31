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

const PlacesForm = () => {
  return <Form {...form}></Form>;
};
