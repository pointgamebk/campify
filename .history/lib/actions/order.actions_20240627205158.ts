"use server";

import Stripe from "stripe";
import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByEventParams,
  GetOrdersByUserParams,
  CreateTransferParams,
} from "@/types";
import { redirect } from "next/navigation";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import { IOrderItem } from "../database/models/order.model";
import Event from "../database/models/event.model";
import { ObjectId } from "mongodb";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";
import { processingFee, stripeFee } from "@/constants";

const populateOrder = (query: any) => {
  return query
    .populate({
      path: "instructor",
      model: User,
      select: "_id stripeAccountId firstName lastName",
    })
    .populate({
      path: "event",
      model: Event,
      select: "_id endDateTime",
    })
    .populate({
      path: "buyer",
      model: User,
      select: "_id firstName lastName",
    });
};

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  await connectToDatabase();

  const price = order.isFree ? 0 : order.price * 100;

  const instructor = await User.findById(order.instructor);

  const buyer = await User.findById(order.buyer);

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        capture_method: "automatic_async",
        receipt_email: buyer.email,
        metadata: {
          account: instructor.stripeAccountId,
        },
      },
      metadata: {
        event: order.event,
        buyer: order.buyer,
        instructor: order.instructor,
        account: instructor.stripeAccountId,
        product: order.eventTitle,
      },
      mode: "payment",
      automatic_tax: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      ...order,
      event: order.event,
      buyer: order.buyer,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

// GET ORDERS BY EVENT
export async function getOrdersByEvent({
  searchString,
  eventId,
}: GetOrdersByEventParams) {
  try {
    await connectToDatabase();

    const eventObjectId = new ObjectId(eventId);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: "$event.title",
          eventId: "$event._id",
          buyer: {
            $concat: [
              "$buyer.firstName",
              " ",
              { $ifNull: ["$buyer.lastName", ""] },
            ],
          },
        },
      },
      {
        $match: {
          $and: [
            { eventId: eventObjectId },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}

// GET NUMBER OF ORDERS BY ORDER
export async function getNumberOfOrdersByEvent(eventId: string) {
  try {
    await connectToDatabase();

    if (!eventId) throw new Error("Event ID is required");
    const eventObjectId = new ObjectId(eventId);

    const orders = await Order.countDocuments({
      event: eventObjectId,
    });

    return orders;
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({
  userId,
  limit = 3,
  page = 1,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await Order.distinct("event._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "event",
        model: Event,
        populate: {
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        },
      });

    const ordersCount = await Order.distinct("event._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET PENDING ORDERS
export const getPendingOrders = async () => {
  try {
    await connectToDatabase();

    const orders = await populateOrder(
      Order.find({ status: "pending" }).sort({ createdAt: "desc" })
    );

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
};

// GET BALANCES BY INSTRUCTOR
export async function getInstructorBalances(instructorId: string) {
  try {
    await connectToDatabase();

    if (!instructorId) throw new Error("Instructor ID is required");

    // All pending orders by instructor
    const getPendingOrdersByInstructor = async (
      instructorId: string
    ): Promise<any> => {
      const orders = await populateOrder(
        Order.find({
          instructor: instructorId,
          status: "pending",
        })
      );

      return orders;
    };

    // All pending orders by instructor (with event end date populated)
    const pendingOrders = await getPendingOrdersByInstructor(instructorId);

    // Pending orders for events that HAVE NOT ended
    const pendingBalanceOrders = pendingOrders.filter((order: IOrderItem) => {
      const currentDate = new Date();
      const orderEndDateTime = new Date(order.event.endDateTime);
      return orderEndDateTime > currentDate;
    });
    const pendingBalanceOrdersCount = pendingBalanceOrders.length;

    // Pending orders for events that HAVE already ended
    const availableBalanceOrders = pendingOrders.filter((order: IOrderItem) => {
      const currentDate = new Date();
      const orderEndDateTime = new Date(order.event.endDateTime);
      return orderEndDateTime < currentDate;
    });
    const availableBalanceOrdersCount = availableBalanceOrders.length;

    // Pending balance BEFORE application fees
    const _pendingBalance = pendingBalanceOrders.reduce(
      (acc: number, order: IOrderItem) => acc + order.totalAmount,
      0
    );

    // Pending balance AFTER application fees
    const pendingBalance = (
      _pendingBalance -
      pendingBalanceOrdersCount * stripeFee -
      _pendingBalance * processingFee
    ).toFixed(2);

    // Available balance BEFORE application fees
    const _availableBalance = availableBalanceOrders.reduce(
      (acc: number, order: IOrderItem) => acc + order.totalAmount,
      0
    );

    // Available balance AFTER application fees
    const availableBalance = (
      _availableBalance -
      availableBalanceOrdersCount * stripeFee -
      _availableBalance * processingFee
    ).toFixed(2);

    return {
      pendingBalance,
      availableBalance,
    };
  } catch (error) {
    handleError(error);
  }
}

// CREATE TRANSFER OF FUNDS TO INSTRUCTOR STRIPE ACCOUNT
export const createTransfer = async (transfer: CreateTransferParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const newTransfer = await stripe.transfers.create({
      amount: transfer.amount,
      currency: "usd",
      destination: transfer.destination,
      transfer_group: transfer.transfer_group,
    });

    if (!newTransfer) throw new Error("Transfer failed");

    const order = await Order.findOneAndUpdate(
      { _id: transfer.transfer_group },
      { status: "transferred" }
    );

    revalidatePath(transfer.path);

    return JSON.parse(JSON.stringify(newTransfer));
  } catch (error) {
    handleError(error);
  }
};

// CREATE TOPUP OF STRIPE ACCOUNT
export const createTopUp = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const topup = await stripe.topups.create({
      amount: 5000,
      currency: "usd",
      description: "Testing top-up",
      statement_descriptor: "Top-up",
    });

    if (!topup) throw new Error("Top-up failed");

    return JSON.parse(JSON.stringify(topup));
  } catch (error) {
    handleError(error);
  }
};

// SEND ORDER NOTIFICATION EMAIL
export const sendOrderNotificationEmail = async (
  name: string,
  email: string,
  product: string
) => {
  try {
    const response = await fetch("https/::/api/mailgun", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        to: email,
        subject: "Order Notification",
        intro: "You've received a new order!",
        content: `Hi ${name},\n\nYou've received a new order for ${product}.\n\nThanks for using Campify!\n\n`,
      }),
    });

    if (!response.ok) {
      throw new Error("Email sending failed.");
    }

    const data = await response.json();
    if (data.success) {
      console.log("Email sent successfully.");
    } else {
      throw new Error("Email sending failed: " + JSON.stringify(data));
    }
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
// export const sendOrderNotificationEmail = async (
//   name: string,
//   email: string,
//   product: string
// ) => {
//   try {
//     const r = await fetch("/api/mailgun", {
//       method: "POST",
//       body: JSON.stringify({
//         name: name,
//         to: email,
//         subject: "Order Notification",
//         intro: "You've received a new order!",
//         content:
//           `Hi ${name},\n\n` +
//           `You've received a new order for ${product}.\n\n` +
//           `Thanks for using Campify!\n\n`,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const res = await r.json();

//     if (res.success) {
//       //alert("Email sent");
//       console.log("Email sent");
//     } else {
//       throw new Error();
//     }
//   } catch (e) {
//     //alert("Email failed");
//     console.error("Email failed");
//   }
// };
