import Collection from "@/components/shared/Collection";
import { getUserById } from "@/lib/actions/user.actions";
import { getEventsByOrganizer } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import { IEvent } from "@/lib/database/models/event.model";

const InstructorDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const instructorId = id;
  const instructor = await getUserById(instructorId);

  // const eventsPage = Number(searchParams?.eventsPage) || 1;
  const page = Number(searchParams?.page) || 1;

  const organizedEvents = await getEventsByOrganizer({
    organizerId: instructorId,
    page: eventsPage,
  });

  // Filter events that have already ended
  const currentDate = new Date();
  const filteredEvents = organizedEvents?.data.filter((event: IEvent) => {
    const eventEndDateTime = new Date(event.endDateTime);
    return eventEndDateTime > currentDate;
  });

  return (
    <>
      <section className="flex justify-center bg-slate bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <div className="grid mt-10">
            <Image
              src={instructor.profilePhoto}
              alt="hero image"
              width={500}
              height={500}
              className="h-full min-h-[200px] object-cover object-center rounded-3xl"
            />
          </div>

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

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0 text-tan">
                  {instructor.profileDescription}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0 text-green">
                  {instructor.profileContact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold text-tan">Upcoming Camps</h2>

        <Collection
          data={filteredEvents}
          emptyTitle="No events created yet"
          emptyStateSubtext="Go create some now!"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default InstructorDetails;
