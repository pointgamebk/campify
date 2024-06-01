import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";
import User from "@/lib/database/models/user.model";
import Event from "@/lib/database/models/event.model";

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
//     console.log(event.data.object.id, event.data.object.charges_enabled);

//     const user = await User.findOne({
//       stripeAccountId: event.data.object.id,
//     });
//     if (user) {
//       user.chargesEnabled = event.data.object.charges_enabled;
//       await user.save();
//     }
//   }

//   return new Response("", { status: 200 });
// }

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
    try {
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
      if (camp) {
        camp.attendees.push(order.buyer);
        await camp.save();
      }

      return NextResponse.json({ message: "OK", order: newOrder });
    } catch (err) {
      console.error("Error processing checkout.session.completed:", err);
      return NextResponse.json({
        message: "Error processing order",
        error: err,
      });
    }
  }

  // UPDATE STRIPE ACCOUNT SETTINGS
  if (eventType === "account.updated") {
    try {
      const { id, charges_enabled } = event.data.object;

      // Find and update user asynchronously
      process.nextTick(async () => {
        try {
          const user = await User.findOne({ stripeAccountId: id });
          if (user) {
            user.chargesEnabled = charges_enabled;
            await user.save();
            console.log(
              `User ${user._id} charges enabled updated to: ${charges_enabled}`
            );
          }
        } catch (err) {
          console.error("Error updating user chargesEnabled:", err);
        }
      });

      // Respond immediately without waiting for the async update to complete
      return new Response("", { status: 200 });
    } catch (err) {
      console.error("Error processing account.updated:", err);
      return NextResponse.json({
        message: "Error processing account update",
        error: err,
      });
    }
  }

  return new Response("", { status: 200 });
}
