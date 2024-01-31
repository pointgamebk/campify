"use client";

import { ChangeEvent, useState } from "react";

import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

type PlacesSearchBoxProps = {
  defaultValue: string;
  onSelectAddress: (address: string) => void;
};

const libraries: Libraries = ["places"];

const PlacesSearchBox = ({
  defaultValue,
  onSelectAddress,
}: PlacesSearchBoxProps) => {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries,
  });

  return (
    <Input
      placeholder="Search an address..."
      disabled={!isLoaded}
      onChange={handleChange}
      value={value}
    />
  );
};

export default PlacesSearchBox;
