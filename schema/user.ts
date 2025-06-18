import { z } from "zod";

// Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 character"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type registerSchema = z.infer<typeof registerSchema>;
