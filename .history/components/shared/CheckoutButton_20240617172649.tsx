//"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  // const { user } = useUser();
  // const userId = user?.publicMetadata.userId as string;
  const clerkUser = await currentUser();
  const user = await getUserByClerkId(clerkUser?.id || "");
  const userId = user._id as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <div className="flex items-center gap-3">
      {/* CANNOT BUY PAST EVENT  */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400 text-tan">
          Sorry, tickets are no longer available
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
