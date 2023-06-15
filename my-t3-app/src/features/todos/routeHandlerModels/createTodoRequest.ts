import { z } from "zod";

export const createTodoRequestValidator = z.object({
    title: z.string().min(1),
    dueDate: z.string().datetime({offset: true}).nullable(),
    complete: z.boolean(),
});

export type CreateTodoRequest = z.infer<typeof createTodoRequestValidator>;
