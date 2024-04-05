import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const { sessionClaims } = auth();

  //Session user id
  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold text-tan">Related Events</h2>
      </section>
    </>
    // <>
    //   {/* ÷ */}

    //   <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
    //     <h2 className="h2-bold text-tan">Related Events</h2>

    //     <Collection
    //       data={relatedEvents?.data}
    //       emptyTitle="No Events Found"
    //       emptyStateSubtext="Check again later"
    //       collectionType="All_Events"
    //       limit={6}
    //       page={searchParams.page as string}
    //       totalPages={relatedEvents?.totalPages}
    //     />
    //   </section>
    // </>
  );
};

export default EventDetails;
