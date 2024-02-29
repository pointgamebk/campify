import React from "react";

const InstructorDetails = async (params: { id: string }) => {
  console.log(params.id);
  return (
    <section className="flex justify-center bg-slate bg-dotted-pattern bg-contain">
      <div className="flex w-full flex-col gap-8 p-5 md:p-10"></div>
    </section>
  );
};

export default InstructorDetails;
