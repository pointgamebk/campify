import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";
import User from "@/lib/database/models/user.model";

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

  // CREATE ORDER
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    console.log("checkout.session.completed", event.data.object);

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || "",
      buyerId: metadata?.buyerId || "",
      instructorId: metadata?.instructorId || "",
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order);
    return NextResponse.json({ message: "OK", order: newOrder });
  }

  // UPDATE STRIPE ACCOUNT SETTINGS
  if (eventType === "account.updated") {
    try {
      const { id, charges_enabled } = event.data.object;
      const updatedUser = await User.findOneAndUpdate(
        { stripeAccountId: id },
        { chargesEnabled: charges_enabled },
        { new: true }
      );
    } catch (error) {
      console.error("no user found");
    }

    return NextResponse.json({ message: "OK" });
  }

  return new Response("", { status: 200 });
}
