import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id);
  const isOrganizer = event.organizer._id === userId;

  return (
    <>
      <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left text-tan">
          {isOrganizer ? "Update Event" : "Invalid Access"}
        </h3>
      </section>

      {isOrganizer && (
        <div className="wrapper my-8">
          <EventForm
            type="Update"
            event={event}
            eventId={event._id}
            userId={userId}
          />
        </div>
      )}
    </>
  );
};

export default UpdateEvent;
