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

  const handleSelect = async (description: string) => {
    console.log({ description });
  };

  const handleChange = (value: string) => {
    setValue(value);
    if (value === "") {
      onSelectAddress("", null, null);
    }
    //console.log({ value });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const { place_id, description } = suggestion;

      return <li key={place_id}>{description}</li>;
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
    //   {status === "OK" && <ul>{renderSuggestions()}</ul>}
    // </div>
    <div>
      <Combobox value={value} onChange={handleChange}>
        <Combobox.Input onChange={(event) => setValue(value)} />
        <Combobox.Options>
          {data.map(({ place_id, description }) => (
            <Combobox.Option key={place_id} value={description} />
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}

export default SearchBox;
