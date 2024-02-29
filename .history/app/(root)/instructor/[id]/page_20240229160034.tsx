import { getUserById } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";

const InstructorDetails = async ({ params: { id } }: SearchParamProps) => {
  const instructorId = id;
  const instructor = await getUserById(instructorId);

  console.log(instructor);

  return (
    <section className="flex justify-center bg-slate bg-dotted-pattern bg-contain">
      <div className="flex w-full flex-col gap-8 p-5 md:p-10">
        <div className="flex flex-col gap-6"></div>
      </div>
    </section>
  );
};

export default InstructorDetails;
