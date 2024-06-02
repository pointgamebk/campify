import stripe from "stripe";
import { NextResponse } from "next/server";
import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database";

export const maxDuration = 20;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // UPDATE STRIPE ACCOUNT SETTINGS
  if (eventType === "account.updated" && event.data.object.charges_enabled) {
    console.log(event.data.object.id, event.data.object.charges_enabled);

    try {
      await connectToDatabase();

      await User.findOneAndUpdate(
        { stripeAccountId: event.data.object.id },
        { chargesEnabled: event.data.object.charges_enabled },
        { new: true }
      );

      return new Response("", { status: 200 });
    } catch (err) {
      return NextResponse.json({
        message: "Error updating account",
        error: err,
      });
    }
  }

  return new Response("", { status: 200 });
}
