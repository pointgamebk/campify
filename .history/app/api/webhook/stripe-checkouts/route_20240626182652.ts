import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";
import Event from "@/lib/database/models/event.model";
import { connectToDatabase } from "@/lib/database";

export const maxDuration = 20;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_CHECKOUTS_WEBHOOK_SECRET!;

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
    await connectToDatabase();

    const { id, amount_total, metadata } = event.data.object;

    const order = {
      stripeId: id,
      event: metadata?.event || "",
      buyer: metadata?.buyer || "",
      instructor: metadata?.instructor || "",
      totalAmount: amount_total ? amount_total / 100 : 0,
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order);

    // Update camp attendees list
    const camp = await Event.findById(order.event);
    camp.attendees.push(order.buyer);
    await camp.save();

    return NextResponse.json({ message: "OK", order: newOrder });
  }
}
