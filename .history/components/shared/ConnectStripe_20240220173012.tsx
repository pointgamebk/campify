import { useEffect } from "react";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { linkStripeAccount } from "@/lib/actions/user.actions";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const ConnectStripe = (userId: string) => {
  const onLink = async () => {
    const link = await linkStripeAccount(userId);

    console.log(link);
  };
};

export default ConnectStripe;
