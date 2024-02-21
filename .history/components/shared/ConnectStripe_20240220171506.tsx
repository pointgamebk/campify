import { useEffect } from "react";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { linkStripeAccount } from "@/lib/actions/user.actions"; }

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const ConnectStripe = ( userId: string) => {
  const onLink = async () => {
    const link = {
      account: userId,
      refreshUrl: event._id,
      returnUrl: event.price,
      type: event.isFree,
    };

    await linkStripeAccount(order);
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
