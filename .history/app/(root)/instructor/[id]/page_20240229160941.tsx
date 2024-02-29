import { getUserById } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";

const InstructorDetails = async ({ params: { id } }: SearchParamProps) => {
  const instructorId = id;
  const instructor = await getUserById(instructorId);

  console.log(instructor);

  return (
    <>
      <section className="flex justify-center bg-slate bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-tan">
              {instructor.firstName} {instructor.lastName}
            </h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-medium-16 rounded-full bg-white/10 px-4 py-2.5 text-tan">
                  {instructor.profileSchool}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-tan p-medium-16 lg:p-regular-18">
                {instructor.profileDescription}
              </p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                {instructor.profileContact}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold text-tan">Upcoming Camps</h2>
      </section>
    </>
  );
};

export default InstructorDetails;
