import ConnectButton from "@/components/shared/ConnectButton";
import { getUserById } from "@/lib/actions/user.actions";
import { getAllEventsByOrganizer } from "@/lib/actions/event.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Collection from "@/components/shared/Collection";
import { SearchParamProps } from "@/types";

const InstructorSettings = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const user = await getUserById(id);
  const events = await getAllEventsByOrganizer({ organizerId: id, page });

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
          <div className="text-green">
            {user.chargesEnabled && (
              <Link href={`/instructor/${id}/update`}>
                {user.profileCompleted
                  ? "Update Profile"
                  : "Complete Profile to Host Camps"}
              </Link>
            )}
          </div>
        </div>
      </section>

      {user.profileCompleted && (
        <section className=" bg-slate bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center text-tan sm:text-left ">
            Camp Details
          </h3>

          <div className="wrapper flex items-center justify-center sm:justify-between">
            <Button asChild size="lg" className="button hidden sm:flex">
              <Link href="/events/create">Create New Camp</Link>
            </Button>
            <Button asChild size="lg" className="button text-center sm:hidden">
              <Link href="/events/create">Create New Camp</Link>
            </Button>
          </div>
        </section>
      )}

      {user.profileCompleted && (
        <section className="wrapper overflow-x-auto text-tan">
          <Collection
            data={events?.data}
            emptyTitle="No camps created yet"
            emptyStateSubtext="Go create some now!"
            collectionType="Events_Organized"
            limit={3}
            page={page}
            totalPages={events?.totalPages}
          />
        </section>
      )}
    </>
  );
};

export default InstructorSettings;
