"use server";

import { revalidatePath } from "next/cache";

import Stripe from "stripe";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Order from "@/lib/database/models/order.model";
import Event from "@/lib/database/models/event.model";
import { handleError } from "@/lib/utils";

import {
  CreateUserParams,
  UpdateUserParams,
  UpdateProfileParams,
} from "@/types";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(
  clerkId: string,
  user: UpdateUserParams,
  path: string
) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updatedUser) throw new Error("User update failed");

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      ),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

export async function createStripeAccount(userId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  try {
    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
        tax_reporting_us_1099_k: { requested: true },
      },
      business_type: "individual",
      individual: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      },
      settings: {
        payouts: {
          schedule: {
            interval: "manual",
          },
        },
      },
    });

    await User.findOneAndUpdate(
      { _id: userId },
      { stripeAccountId: account.id },
      { new: true }
    );

    const link = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "https://webhooktesting.vercel.app/",
      return_url: "https://webhooktesting.vercel.app/",
      type: "account_onboarding",
    });

    return link.url;
  } catch (error) {
    handleError(error);
  }
}

//Delete Connect accounts added with TEST KEYS
export async function deleteStripeAccount(accountId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const deleted = await stripe.accounts.del(accountId);

    console.log("Deleted account: ", deleted);

    return deleted.deleted;
  } catch (error) {
    handleError(error);
  }
}

export async function updateProfile(
  userId: string,
  school: string,
  contact: string,
  description: string,
  photo: string
) {
  try {
    await connectToDatabase();

    const updatedProfile = await User.findOneAndUpdate(
      { _id: userId },
      {
        profileSchool: school,
        profileContact: contact,
        profileDescription: description,
        profilePhoto: photo,
      },
      { new: true }
    );

    if (!updatedProfile) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedProfile));
  } catch (error) {
    handleError(error);
  }
}

export async function checkIsAdmin() {
  try {
    await connectToDatabase();

    const admin = await User.findOne({ username: "bigdog" });

    if (!admin) throw new Error("Admin not found");

    return JSON.parse(JSON.stringify(admin._id));
  } catch (error) {
    handleError(error);
  }
}
