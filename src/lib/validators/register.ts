import { z } from "zod";

export const RegisterValidator = z
  .object({
    username: z
      .string()
      .min(3, {
        message: "Username must be at least 3 characters long",
      })
      .max(30, {
        message: "Username cannot exceed 30 characters",
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores",
      })
      .refine((u) => !u.includes(" "), "Username cannot contain spaces"),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterRequest = z.infer<typeof RegisterValidator>;
