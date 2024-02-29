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
import { Checkbox } from "@/components/ui/checkbox";
import { profileFormSchema } from "@/lib/validator";
import { profileDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import Image from "next/image";
import { updateProfile } from "@/lib/actions/user.actions";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

type ProfileFormProps = {
  userId: string;
};

const ProfileForm = ({ userId }: ProfileFormProps) => {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(userId);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      ></form>
    </Form>
  );
};

export default ProfileForm;
