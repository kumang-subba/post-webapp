import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(100, {
      message: "Title cannot exceed 100 characters",
    }),
  coverImage: z.string().min(1, {
    message: "Cover image is required",
  }),
  categories: z.array(z.string()),
  content: z.any(),
});

export type PostCreateRequest = z.infer<typeof PostValidator>;
