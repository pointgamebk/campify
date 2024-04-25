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
import Event from "../database/models/event.model";
import { ObjectId } from "mongodb";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";

const populateOrder = (query: any) => {
  return query.populate({
    path: "instructor",
    model: User,
    select: "_id stripeAccountId",
  });
};

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : order.price * 100;

  const instructor = await User.findById(order.instructor);

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
      // payment_intent_data: {
      //   capture_method: "automatic_async",
      //   metadata: {
      //     account: instructor.stripeAccountId,
      //   },
      // },
      metadata: {
        event: order.event,
        buyer: order.buyer,
        instructor: order.instructor,
        account: instructor.stripeAccountId,
      },
      mode: "payment",
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

    if (!eventId) throw new Error("Event ID is required");
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
            $concat: ["$buyer.firstName", " ", "$buyer.lastName"],
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

// GET ORDERS BY USER
export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
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

// GET ORDERS
export const getOrders = async () => {
  try {
    const orders = await populateOrder(
      Order.find({ status: "pending" }).sort({ createdAt: "desc" })
    );

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
};

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

    console.log("Transfer created: ", newTransfer);

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

    console.log("Topup created: ", topup);

    return JSON.parse(JSON.stringify(topup));
  } catch (error) {
    handleError(error);
  }
};
