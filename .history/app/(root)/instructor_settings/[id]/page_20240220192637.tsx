import React from "react";

type InstructorSettingsProps = {
  id: string;
};

const InstructorSettings = async ({}) => {
  return (
    <div className="wrapper grid grid-cols-1 gap-5">
      <h3 className="h3-bold text-white">Instructor Settings</h3>
      <p className="text-white">Stripe Account:</p>
      <p className="text-white">Transfers enabled:</p>
      <p className="text-white">{id}</p>
    </div>
  );
};

export default InstructorSettings;
