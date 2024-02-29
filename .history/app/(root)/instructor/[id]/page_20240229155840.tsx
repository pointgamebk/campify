import { getUserById } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";

const InstructorDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const instructorId = id;
  console.log(instructorId);

  return (
    <section className="flex justify-center bg-slate bg-dotted-pattern bg-contain">
      <div className="flex w-full flex-col gap-8 p-5 md:p-10"></div>
    </section>
  );
};

export default InstructorDetails;
