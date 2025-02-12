import { object, string } from "zod";

export const SignInSchema = object({
  email: string().email("Invalid Email"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
});

export const RegisterSchema = object({
  name: string().min(1, "Name must be at least 1 characters"),
  email: string().email("Invalid Email"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
  confirmPassword: string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password does not match",
  path: ["confirmPassword"],
});
