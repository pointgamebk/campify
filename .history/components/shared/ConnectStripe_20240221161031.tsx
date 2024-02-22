import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { createStripeAccount } from "@/lib/actions/user.actions";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type ConnectStripeProps = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
};

const ConnectStripe = ({
  userId,
  firstName,
  lastName,
  email,
}: ConnectStripeProps) => {
  console.log(userId);
  const onLink = async () => {
    const link = await createStripeAccount(userId);

    console.log(link);
  };

  return (
    <form action={onLink} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        Connect Stripe
      </Button>
    </form>
  );
};

export default ConnectStripe;
