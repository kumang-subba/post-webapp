import { z } from "zod";

export const ProfileChangeValidator = z.object({
  username: z
    .string()
    .min(1, {
      message: "Please enter a username",
    })
    .max(30, {
      message: "Username cannot exceed 30 characters",
    })
    .refine((u) => !u.includes(" "), "Username cannot contain spaces"),
  password: z.string().optional(),
  image: z.string().optional(),
});

export type ProfileChangeRequest = z.infer<typeof ProfileChangeValidator>;
