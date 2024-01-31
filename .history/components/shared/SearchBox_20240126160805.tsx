import React from "react";

interface ISearchBoxProps {
  onSelectAddress: (
    address: string,
    latitude: number | null,
    longitude: number | null
  ) => void;
  defaultValue: string;
}

const SearchBox = () => {
  return <div>SearchBox</div>;
};

export default SearchBox;
