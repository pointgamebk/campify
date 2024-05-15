import { IEvent } from "@/lib/database/models/event.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Separator } from "../ui/separator";
import CardLocaleConverter from "./CardLocaleConverter";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl  p-3 shadow-sm transition-all bg-white/80">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4 bg-white">
        {!hidePrice && (
          <div className="flex gap-2 bg-white">
            <span className="p-semibold-14 w-min rounded-full px-4 py-1 text-slate ">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <p className="p-semibold-14  rounded-full bg-grey-500/20 px-4 py-1 text-slate line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}

        <CardLocaleConverter event={event} />

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {event.location}
        </p>

        <Separator className="border border-black" />

        <Link href={`/events/${event._id}`}>
          {event.canceled ? (
            <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black bg-white">
              EVENT CANCELED
            </p>
          ) : (
            <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black bg-white">
              {event.title}
            </p>
          )}
        </Link>

        <div className="flex-between w-full bg-white">
          <Link
            href={`/instructor/${event.organizer._id}`}
            className="flex gap-2"
          >
            <p className="p-medium-14 md:p-medium-16 text-grey-600 bg-white">
              {event.organizer.firstName} {event.organizer.lastName}
            </p>
          </Link>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
