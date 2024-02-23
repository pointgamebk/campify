import stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";
import User from "@/lib/database/models/user.model";
import getRawBody from "raw-body";

export async function POST(request: NextApiRequest) {
  //const body = await request.text();
  const body = await getRawBody(request);

  console.log("body", body);

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

  console.log(eventType);
  // CREATE
  // if (eventType === "checkout.session.completed") {
  //   const { id, amount_total, metadata } = event.data.object;

  //   const order = {
  //     stripeId: id,
  //     eventId: metadata?.eventId || "",
  //     buyerId: metadata?.buyerId || "",
  //     totalAmount: amount_total ? (amount_total / 100).toString() : "0",
  //     createdAt: new Date(),
  //   };

  //   const newOrder = await createOrder(order);
  //   return NextResponse.json({ message: "OK", order: newOrder });
  // }

  // if (eventType === "account.updated") {
  //   const account = event.data.object;
  //   const user = await User.findOne({ stripeAccountId: account.id });
  //   user.chargesEnabled = account.charges_enabled;

  //   return NextResponse.json({ message: "OK", user: user });
  // }

  return new Response("", { status: 200 });
}
