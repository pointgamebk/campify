"use client";

import SearchBox from "@/components/shared/SearchBox";

const onSelectAddress = () => {};

const Places = () => {
  return (
    <div>
      <SearchBox onSelectAddress={onSelectAddress} defaultValue="" />
    </div>
  );
};

export default Places;
