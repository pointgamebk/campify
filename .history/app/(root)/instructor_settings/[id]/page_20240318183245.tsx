import ConnectButton from "@/components/shared/ConnectButton";
import { getUserById } from "@/lib/actions/user.actions";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

      {user.chargesEnabled && (
        <section className=" bg-slate bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center text-tan sm:text-left ">
            Camp Details
          </h3>

          <div className="wrapper flex items-center justify-center sm:justify-between">
            <Button asChild size="lg" className="button hidden sm:flex">
              <Link href="/events/create">Create New Event</Link>
            </Button>
          </div>
        </section>
      )}

      {/* <section className=" bg-slate bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center text-tan sm:text-left ">
          Camp Details
        </h3>



        <div className="wrapper flex items-center justify-center sm:justify-between">
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section> */}

      <section className="wrapper overflow-x-auto text-tan">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left text-tan">Camp ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left text-tan">
                Camp Title
              </th>
              <th className="min-w-[150px] py-3 text-left text-tan">Date</th>
            </tr>
          </thead>
          <tbody>
            {events && events.data.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No camps yet.
                </td>
              </tr>
            ) : (
              <>
                {events &&
                  events.data.map((row: IEvent) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-green">
                        <Link href={`/orders?eventId=${row._id}`}>
                          {row._id}
                        </Link>
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.title}
                      </td>
                      <td className="min-w-[100px] py-4">
                        {formatDateTime(row.startDateTime).dateTime}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default InstructorSettings;
