"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";

type CardLocaleConverterProps = {
  event: IEvent;
};

const CardLocaleConverter = ({ event }: CardLocaleConverterProps) => {
  return (
    <p className="p-medium-16 p-medium-18 text-grey-500 bg-white">
      {formatDateTime(event.startDateTime).dateTime}
    </p>
  );
};

export default CardLocaleConverter;
