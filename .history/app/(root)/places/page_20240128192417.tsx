"use client";

import SearchBox from "@/components/shared/SearchBox";

const Places = () => {
  return (
    <div>
      <SearchBox
        onSelectAddress={(address, latitude, longitude) => {
          setValue("address", address);
          setValue("latitude", latitude);
          setValue("longitude", longitude);
        }}
        defaultValue=""
      />
    </div>
  );
};

export default Places;
