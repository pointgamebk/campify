import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { checkIsAdmin } from "@/lib/actions/user.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();

  // Session User ID
  const userId = sessionClaims?.userId as string;

  const user = await getUserById(userId);

  const page = Number(searchParams?.page) || 1;

  const orders = await getOrdersByUser({ userId, page });

  const orderedEvents = orders?.data?.map((order: IOrder) => order.event) || [];

  console.log(orderedEvents);

  const isAdmin = (await checkIsAdmin()) === userId;

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
        <div className="text-center sm:hidden">
          <Button asChild size="lg" className="button text-center  sm:hidden">
            <Link href={"/instructor_settings/"}>
              {user.stripeAccountId
                ? "Instructor Dashboard"
                : "Become an Instructor"}
            </Link>
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
          page={page}
          totalPages={orders?.totalPages}
        />

        {isAdmin && (
          <div className="max-w-[200px] mt-5">
            <Button asChild size="lg" className="button hidden sm:flex">
              <Link href={`/admin`}>Admin</Link>
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default ProfilePage;
