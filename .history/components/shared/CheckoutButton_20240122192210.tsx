"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { useUser } from "@clerk/nextjs";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return <div>CheckoutButton</div>;
};

export default CheckoutButton;
