import React from "react";

interface ISearchBoxProps {
  onSelectAddress: (
    address: string,
    latitude: number | null,
    longitude: number | null
  ) => void;
}

const SearchBox = () => {
  return <div>SearchBox</div>;
};

export default SearchBox;
