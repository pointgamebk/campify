"use client";

import { useState, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import { placesFormSchema } from "@/lib/validator";
import { placesDefaultValues } from "@/constants";

import SearchBox from "./SearchBox";

const libraries: Libraries = ["places"];

const PlacesForm = () => {
  const initialValues = placesDefaultValues;

  const { setValue } = useFormContext();

  const form = useForm<z.infer<typeof placesFormSchema>>({
    resolver: zodResolver(placesFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof placesFormSchema>) {
    console.log(values);
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
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  {/* <Input
                    placeholder="Select the address..."
                    {...field}
                    className="input-field"
                  /> */}
                  <SearchBox defaultValue={initialValues.location} />
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
          {form.formState.isSubmitting ? "Submitting..." : `Get Location `}
        </Button>
      </form>
    </Form>
  );
};

export default PlacesForm;
