import { z } from "zod";

export const TourSchema = z.object({
  title: z.string().min(3, "Title must be greater than 3 char"),
  description: z.string(),
  price: z.number(),
  comparePrice: z.number(),
  images: z.array(z.string()),
  state: z.string().min(3, "State must be selected"),
  city: z.string().min(3, "City must be selected"),
  country: z.string().min(3, "Country must be selected"),
  status: z.enum(["ACTIVE", "DRAFT", "PENDING"]),
  duration: z.string().optional(),
  departureDate: z.string().optional(),
  groupSize: z.string().optional(),
  isFeatured: z.boolean(),

  // Define the itinerary array schema
  itinerary: z
    .array(
      z.object({
        label: z.string(),
        description: z.string(),
      })
    )
    .refine((val) => val.length > 0, {
      message: "At least one itinerary is required",
    }),
});

export type TourSchemaType = z.infer<typeof TourSchema>;
