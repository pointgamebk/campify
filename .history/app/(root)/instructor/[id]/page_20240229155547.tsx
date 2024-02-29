import { getUserById } from "@/lib/actions/user.actions";

const InstructorDetails = async (params: { id: string }) => {
  const instructor = await getUserById(params.id);

  console.log(instructor);
  return (
    <section className="flex justify-center bg-slate bg-dotted-pattern bg-contain">
      <div className="flex w-full flex-col gap-8 p-5 md:p-10"></div>
    </section>
  );
};

export default InstructorDetails;
