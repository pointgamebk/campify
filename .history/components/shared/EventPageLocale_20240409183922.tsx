"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";

type EventPageLocaleProps = {
  event: IEvent;
};

const EventPageLocale = ({ event }: EventPageLocaleProps) => {
  return (
    <>
      <p>
        {formatDateTime(event.startDateTime).dateOnly} -{" "}
        {formatDateTime(event.startDateTime).timeOnly}
      </p>
      <p>
        {formatDateTime(event.endDateTime).dateOnly} -{" "}
        {formatDateTime(event.endDateTime).timeOnly}
      </p>
    </>
  );
};

export default EventPageLocale;
