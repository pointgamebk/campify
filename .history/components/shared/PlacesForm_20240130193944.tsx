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

const libraries: Libraries = ["places"];

const PlacesForm = () => {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries,
  });
  const [open, setOpen] = useState(false);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    defaultValue: placesDefaultValues.location,
  });
  const initialValues = placesDefaultValues;

  const form = useForm<z.infer<typeof placesFormSchema>>({
    resolver: zodResolver(placesFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof placesFormSchema>) {
    console.log(values);
  }

  const handleSelect = async (address: string) => {
    console.log({ address });
    setValue(address, false);
    clearSuggestions();
    setOpen(false);

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log({ address, lat, lng });
    } catch (error) {
      console.error("😱 Error: ", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
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
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {value === "" ? "Search address..." : value}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[200px] p-0"
                      onChange={handleChange}
                    >
                      <Command>
                        <CommandInput
                          placeholder="Search address..."
                          className="h-9"
                          disabled={!ready}
                          {...field}
                        />
                        <CommandEmpty>No address found.</CommandEmpty>
                        <CommandGroup>
                          {data.map((suggestion) => (
                            <CommandItem
                              key={suggestion.place_id}
                              value={suggestion.description}
                              // onSelect={(currentValue) => {
                              //   setValue(currentValue === value ? "" : currentValue);
                              //   setOpen(false);
                              // }}
                              onSelect={handleSelect}
                            >
                              {suggestion.description}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  value === suggestion.description
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
