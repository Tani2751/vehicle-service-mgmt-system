import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username is too long"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone number is too long"),

  address: z
    .string()
    .min(10, "Address is required"),

  city: z
    .string()
    .min(3, "City is required"),

  // 🔹 Select fields
  roleId: z
    .string()
    .min(1, "Role is required"),

  garageId: z
    .string()
    .min(1, "Garage is required"),
});
