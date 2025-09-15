import z from "zod";

export const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().trim().min(6, "At least 6 chracter needed"),
});
