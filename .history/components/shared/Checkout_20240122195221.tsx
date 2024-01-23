import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import { Button } from "../ui/button";

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const onCheckout = async () => {
    console.log("checkout");
  };

  return (
    <form action={onCheckout} method="post">
      <Button></Button>
    </form>
  );
};

export default Checkout;
