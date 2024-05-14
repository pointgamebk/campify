import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { getNumberOfOrdersByEvent } from "@/lib/actions/order.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import EventPageLocale from "@/components/shared/EventPageLocale";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const { sessionClaims } = auth();

  //Session user id
  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id);

  const page = Number(searchParams?.page) || 1;

  const attending = event.attendees.some((a: string) => a === userId);

  const orders = await getNumberOfOrdersByEvent(id);

  const soldOut = event.noLimit ? false : (orders ?? 0) >= event.limit;

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page,
  });

  return (
    <>
      <section className="flex justify-center bg-slate bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1  md:grid-cols-2 2xl:max-w-7xl">
          <div className="grid mt-10">
            <Image
              src={event.imageUrl}
              alt="hero image"
              width={500}
              height={500}
              className="h-full min-h-[300px] object-cover object-center rounded-3xl"
            />
          </div>

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold text-tan">{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green">
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-white/10 px-4 py-2.5 text-tan">
                    {event.category.name}
                  </p>
                </div>
                <div className="p-medium-18 ml-2 mt-2 sm:mt-0 text-tan">
                  <Link
                    href={`/instructor/${event.organizer._id}`}
                    className="flex gap-2"
                  >
                    <p className="text-green p-medium-18">
                      {event.organizer.firstName} {event.organizer.lastName}
                    </p>
                  </Link>
                </div>
              </div>
            </div>

            {/* checkout button  */}
            {userId !== event.organizer._id && !attending && !soldOut && (
              <CheckoutButton event={event} />
            )}

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div
                  className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center text-tan"
                  style={{ width: "50%" }}
                >
                  <EventPageLocale event={event} />
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3 text-tan">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-green">What You'll Learn:</p>
              <p className="p-medium-16 lg:p-regular-18 text-tan">
                {event.description}
              </p>
              {!event.noLimit && (
                <p className="p-bold-20 text-green">
                  Spots remaining:{" "}
                  <span className="text-tan">
                    {orders ? event.limit - orders : event.limit}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold text-tan">Related Events</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={page}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetails;
