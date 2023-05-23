import { z } from "zod";

export const schema = z.object({
  title: z.string().min(3, "Titulo deve ter no mínimo 3 caracteres"),
  description: z.string().optional(),
});

export type CreateTaskData = z.infer<typeof schema>;
