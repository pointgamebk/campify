import React from "react";

const InstructorSettings = async (params: { id: string }) => {
  return (
    <div className="wrapper grid grid-cols-1 gap-5">
      <h3 className="h3-bold text-white">Instructor Settings</h3>
      <p className="text-white">Stripe Account:</p>
      <p className="text-white">Transfers enabled:</p>
    </div>
  );
};

export default InstructorSettings;
