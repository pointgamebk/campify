import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();

  //Session user id
  const userId = sessionClaims?.userId as string;
  const user = await getUserById(userId);

  const ordersPage = Number(searchParams?.ordersPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedEvents = orders?.data?.map((order: IOrder) => order.event) || [];

  return (
    <>
      {/* My Tickets */}
      <section className=" bg-dotted-pattern bg-cover bg-center py-5">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <Button asChild size="lg" className="button hidden  sm:flex">
            <Link href={`/instructor_settings/${userId}`}>
              {user.stripeAccountId
                ? "Instructor Dashboard"
                : "Become an Instructor"}
            </Link>
          </Button>
          <h3 className="h3-bold text-center sm:text-left text-tan">
            My Tickets
          </h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Camps</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper py-8 ">
        <Collection
          data={orderedEvents}
          emptyTitle="No camps joined yet"
          emptyStateSubtext="No worries - plenty of exciting games to check out!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="joinsPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Events Organized */}
      {/* {user.chargesEnabled && (
        <section className="bg-slate bg-dotted-pattern bg-cover bg-center py-5">
          <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className="h3-bold text-center sm:text-left text-tan">
              Events Organized
            </h3>
            <Button asChild size="lg" className="button hidden sm:flex">
              <Link href="/events/create">Create New Event</Link>
            </Button>
          </div>
        </section>
      )}

      {user.chargesEnabled && (
        <section className="wrapper py-8">
          <Collection
            data={organizedEvents?.data}
            emptyTitle="No events created yet"
            emptyStateSubtext="Go create some now!"
            collectionType="Events_Organized"
            limit={3}
            page={eventsPage}
            urlParamName="eventsPage"
            totalPages={organizedEvents?.totalPages}
          />
        </section>
      )} */}
    </>
  );
};

export default ProfilePage;
