"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import React from "react";
import Checkout from "./Checkout";

const CheckoutButton = async ({
  event,
  userId,
}: {
  event: IEvent;
  userId: string;
}) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  try {
    return (
      <div className="flex items-center gap-3">
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
              {/* <Checkout event={event} userId={userId} /> */}
              <Button asChild className="button rounded-full" size="lg">
                <Link href="/sign-in">Get Tickets</Link>
              </Button>
            </SignedIn>
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error with checkout button", error);
  }
};

export default CheckoutButton;
