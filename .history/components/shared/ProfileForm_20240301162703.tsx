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
import { updateUser } from "@/lib/actions/user.actions";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";

type ProfileFormProps = {
  userId: string;
};

const ProfileForm = ({ userId }: ProfileFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values);

    let uploadedImageUrl = values.photo;

    try {
      const user = await getUserById(userId);
      console.log("user", user);
      const _user = {
        ...user,
        profileSchool: values.school,
        profileContact: values.contact,
        profileDescription: values.description,
        profilePhoto: "profile_photo",
      };
      console.log("_user", _user);
      const updatedUser = await updateUser(user.clerkId, _user);

      if (updatedUser) {
        console.log(updatedUser);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Current College or University"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Website or Social Media Link"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Describe yourself and your work"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit Update"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
