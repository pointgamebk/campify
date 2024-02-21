import { useEffect } from "react";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const ConnectStripe = () => {
  const onLink = async () => {
    const link = {
      account: event.title,
      refreshUrl: event._id,
      returnUrl: event.price,
      type: event.isFree,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        Link Stripe Account
      </Button>
    </form>
  );
};

export default ConnectStripe;
