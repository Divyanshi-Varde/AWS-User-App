import { z } from "zod";

export const AddUserSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required"),
  last_name: z
    .string()
    .min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  address: z.string().min(1, "Address is required"),
});
