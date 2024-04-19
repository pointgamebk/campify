"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { deleteStripeAccount } from "@/lib/actions/user.actions";
import { deleteStripeAccountDefaultValues } from "@/constants";
import { deleteStripeAccountFormSchema } from "@/lib/validator";

const DeleteStripeAccountForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof deleteStripeAccountFormSchema>>({
    resolver: zodResolver(deleteStripeAccountFormSchema),
    defaultValues: deleteStripeAccountDefaultValues,
  });

  async function onSubmit(
    values: z.infer<typeof deleteStripeAccountFormSchema>
  ) {}
};

export default DeleteStripeAccountForm;
