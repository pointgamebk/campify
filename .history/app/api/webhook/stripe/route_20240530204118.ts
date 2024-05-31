// import stripe from "stripe";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";
import User from "@/lib/database/models/user.model";
import Event from "@/lib/database/models/event.model";

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

    const order = {
      stripeId: id,
      event: metadata?.event || "",
      buyer: metadata?.buyer || "",
      instructor: metadata?.instructor || "",
      totalAmount: amount_total ? amount_total / 100 : 0,
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order);

    const camp = await Event.findById(order.event);
    camp.attendees.push(order.buyer);
    await camp.save();

    return NextResponse.json({ message: "OK", order: newOrder });
  }

  // UPDATE STRIPE ACCOUNT SETTINGS
  if (eventType === "account.updated") {
    console.log(event);
    try {
      const { id, charges_enabled } = event.data.object;

      await User.findOneAndUpdate(
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

// export async function POST(request: Request) {
//   const body = await request.text();

//   const sig = request.headers.get("stripe-signature") as string;
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//   } catch (err) {
//     return NextResponse.json({ message: "Webhook error", error: err });
//   }

//   // Get the ID and type
//   const eventType = event.type;

//   // CREATE ORDER
//   if (eventType === "checkout.session.completed") {
//     const { id, amount_total, metadata } = event.data.object;

//     const order = {
//       stripeId: id,
//       event: metadata?.event || "",
//       buyer: metadata?.buyer || "",
//       instructor: metadata?.instructor || "",
//       totalAmount: amount_total ? amount_total / 100 : 0,
//       createdAt: new Date(),
//     };

//     const newOrder = await createOrder(order);

//     const camp = await Event.findById(order.event);
//     camp.attendees.push(order.buyer);
//     await camp.save();

//     return NextResponse.json({ message: "OK", order: newOrder });
//   }

//   // UPDATE STRIPE ACCOUNT SETTINGS
//   if (eventType === "account.updated") {
//     console.log(event);
//     try {
//       const { id, charges_enabled } = event.data.object;

//       await User.findOneAndUpdate(
//         { stripeAccountId: id },
//         { chargesEnabled: charges_enabled },
//         { new: true }
//       );
//     } catch (error) {
//       console.error("no user found");
//     }

//     return NextResponse.json({ message: "OK" });
//   }

//   return new Response("", { status: 200 });
// }
