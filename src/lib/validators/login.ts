import { z } from "zod";

export const LoginValidator = z.object({
  username: z
    .string()
    .min(1, {
      message: "Please enter a username",
    })
    .max(30, {
      message: "Username cannot exceed 30 characters",
    })
    .refine((u) => !u.includes(" "), "Username cannot contain spaces"),
  password: z.string().min(1, {
    message: "Please enter your password",
  }),
});

export type LoginRequest = z.infer<typeof LoginValidator>;
