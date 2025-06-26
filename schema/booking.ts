import { z } from "zod";

export const BookingSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email().nonempty("Email is required"),
  travelDate: z.string().nonempty(),

  // Validate phone number as a string of digits, length 10+
  phone: z
    .string()
    .regex(/^\d{10,}$/, "Phone number must be at least 10 digits"),

  emergencyPhone: z
    .string()
    .regex(/^\d{10,}$/, "Emergency phone must be at least 10 digits"),

  numberOfTravelers: z
    .string()
    .min(1, "Must have at least 1 traveler")
    .max(20, "Maximum 20 travelers allowed"),
});

export type BookingType = z.infer<typeof BookingSchema>;
