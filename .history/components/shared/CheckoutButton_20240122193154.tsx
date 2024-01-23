"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <div className="flex items-center gap-3">
      {/* CANNOT BUY PAST EVENT  */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
