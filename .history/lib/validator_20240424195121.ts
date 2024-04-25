import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string(),
});

export const profileFormSchema = z.object({
  profileDescription: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  profilePhoto: z
    .string()
    .min(3, "Value must be at least 3 characters")
    .max(400, "Value must be less than 400 characters"),
  profileSchool: z
    .string()
    .min(10, "Value must be at least 10 characters")
    .max(400, "Value must be less than 100 characters"),
  profileContact: z
    .string()
    .min(3, "Contact must be at least 3 characters")
    .max(400, "Contact must be less than 100 characters"),
});

export const placesFormSchema = z.object({
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
});

export const deleteStripeAccountFormSchema = z.object({
  accountId: z
    .string()
    .min(3, "Account ID must be at least 3 characters")
    .max(400, "Account ID must be less than 400 characters"),
});
