import { z } from "zod";
import { createTodoRequestValidator } from "./createTodoRequest";

export const updateTodoRequestValidator = createTodoRequestValidator.extend({
    id: z.string().cuid(),
})

export type UpdateTodoRequest = z.infer<typeof updateTodoRequestValidator>