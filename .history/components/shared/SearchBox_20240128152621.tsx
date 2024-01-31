"use client";

import { ChangeEvent, useState } from "react";

import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { Check, ChevronsUpDown } from "lucide-react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

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

import { Combobox } from "@headlessui/react";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface ISearchBoxProps {
  onSelectAddress: (
    address: string,
    latitude: number | null,
    longitude: number | null
  ) => void;
  defaultValue: string;
}

const libraries: Libraries = ["places"];

const SearchBox = ({ onSelectAddress, defaultValue }: ISearchBoxProps) => {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries,
  });

  if (!isLoaded) return null;
  if (loadError) return <div>Error loading</div>;

  return (
    <ReadySearchBox
      onSelectAddress={onSelectAddress}
      defaultValue={defaultValue}
    />
  );
};

function ReadySearchBox({ onSelectAddress, defaultValue }: ISearchBoxProps) {
  const [open, setOpen] = useState(false);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300, defaultValue });

  const handleSelect = async (address: string) => {
    console.log({ address });
    setValue(address, false);
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      onSelectAddress("", null, null);
    }
    //console.log({ value });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const { place_id, description } = suggestion;

      return (
        <option key={place_id} value={description} onSelect={handleSelect}>
          {description}
        </option>
      );
    });

  console.log({ status, data });

  return (
    // <div>
    //   <input
    //     value={value}
    //     onChange={handleChange}
    //     disabled={!ready}
    //     placeholder="Select an address"
    //     className="w-full p-2"
    //     autoComplete="off"
    //   />
    //   {status === "OK" && renderSuggestions()}
    // </div>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {"Select an address..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" onChange={handleChange}>
        <Command>
          <CommandInput placeholder="Search address..." className="h-9" />
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
  );
}

export default SearchBox;
