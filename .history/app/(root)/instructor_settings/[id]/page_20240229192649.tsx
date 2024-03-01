import ConnectButton from "@/components/shared/ConnectButton";
import { getUserById } from "@/lib/actions/user.actions";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import Link from "next/link";

type InstructorSettingsProps = {
  params: { id: string };
};

const InstructorSettings = async ({
  params: { id },
}: InstructorSettingsProps) => {
  const user = await getUserById(id);
  const events = await getEventsByUser({ userId: id, page: 1 });

  return (
    <>
      <section className="flex justify-center bg-slate bg-dotted-pattern bg-contain">
        <div className="wrapper grid grid-cols-1 gap-5">
          <h3 className="h3-bold text-tan">Instructor Dashboard</h3>
          <p className="text-tan">
            Stripe Account: {user.stripeAccountId ? "Linked" : "Not Linked"}
          </p>
          <p className="text-tan">
            Transfers enabled: {user.chargesEnabled ? "Yes" : "No"}
          </p>
          {user.chargesEnabled === false ? <ConnectButton /> : null}
        </div>
      </section>

      <section className="flex justify-center bg-slate bg-dotted-pattern bg-contain">
        <div className="wrapper grid grid-cols-1 gap-5">
          <h3 className="h3-bold text-tan">Order Details</h3>
          {events?.data.length > 0 ? (
            events?.data.map((event: IEvent) => (
              <div key={event._id}>
                <Link
                  href={`/orders?eventId=${event._id}`}
                  className="flex gap-2 text-tan underline"
                >
                  {event.title}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-tan">No orders yet</p>
          )}
        </div>
      </section>
    </>
  );
};

export default InstructorSettings;
