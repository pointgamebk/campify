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
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  photo: z
    .string()
    .min(3, "Value must be at least 3 characters")
    .max(400, "Value must be less than 400 characters"),
  school: z
    .string()
    .min(50, "Value must be at least 50 characters")
    .max(400, "Value must be less than 100 characters"),
  contact: z
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
