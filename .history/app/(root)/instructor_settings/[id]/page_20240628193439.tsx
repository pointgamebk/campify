import ConnectButton from "@/components/shared/ConnectButton";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { getAllEventsByOrganizer } from "@/lib/actions/event.actions";
import { getInstructorBalances } from "@/lib/actions/order.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Collection from "@/components/shared/Collection";
import { SearchParamProps } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { authorizedIds } from "@/constants";

const InstructorSettings = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  // Session user ID
  const clerkUser = await currentUser();
  const user = await getUserByClerkId(clerkUser?.id || "");
  const userId = user._id as string;

  const page = Number(searchParams?.page) || 1;
  const events = await getAllEventsByOrganizer({ organizerId: id, page });

  const isAuthorized = userId === id;

  const isAuthInstructor = authorizedIds.includes(userId);

  const balances = await getInstructorBalances(id);

  return (
    <>
      <section className="flex justify-center bg-slate bg-dotted-pattern bg-contain">
        {isAuthorized ? (
          <div className="wrapper grid grid-cols-1 gap-5">
            <h3 className="h3-bold text-tan">Instructor Dashboard</h3>
            <p className="text-tan">
              Stripe Account: {user.stripeAccountId ? "Linked" : "Not Linked"}
            </p>
            <p className="text-tan">
              Transfers enabled: {user.chargesEnabled ? "Yes" : "No"}
            </p>
            {!isAuthInstructor && (
              <div className="text-tan p-medium-16 max-w-[500px] italic">
                To register as an athlete instructor, please send a short
                description of your athletic background and any other relevant
                training experience to campifyapp@gmail.com. Social media links
                are also helpful. Be sure to include your Campify username in
                your email. We will review your application and get back to you
                as soon as possible.
              </div>
            )}
            {isAuthInstructor && user.chargesEnabled === false ? (
              <div>
                <ConnectButton />
                <div className="mt-5 text-tan p-medium-16 max-w-[500px]">
                  Only press/click the "Connect Stripe" button once. It may take
                  a few seconds to process.
                </div>
                <div className="mt-5 text-tan p-regular-14 max-w-[500px]">
                  If Stripe Account status shows "Linked", please allow up to 24
                  hours for Transfers Enabled status to update. If Transfers
                  Enabled status has not updated after that time, contact
                  support.
                </div>
              </div>
            ) : null}
            {user.profileCompleted && (
              <div>
                <div className="text-tan p-semibold-20">
                  Pending Balance: {balances?.pendingBalance}
                </div>
                <div className="text-tan p-semibold-20">
                  Transferable Balance: {balances?.availableBalance}
                </div>
              </div>
            )}
            {user.profileCompleted && (
              <div className="text-green p-semibold-20 underline">
                <Link href={`/instructor/${id}/`}>My Instructor Profile</Link>
              </div>
            )}
            <div className="text-green p-medium-18 underline">
              {user.chargesEnabled && (
                <Link href={`/instructor/${id}/update`}>
                  {user.profileCompleted
                    ? "Update Profile"
                    : "Complete Profile to Host Camps"}
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="wrapper grid grid-cols-1 gap-5">
            <h3 className="h3-bold text-tan">Invalid Access</h3>
          </div>
        )}
      </section>

      {isAuthorized && user.profileCompleted && (
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

      {isAuthorized && user.profileCompleted && (
        <section className="wrapper overflow-x-auto text-tan">
          <Collection
            data={events?.data}
            emptyTitle="No camps created yet"
            emptyStateSubtext="Visit How To Campify for help to get started"
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
