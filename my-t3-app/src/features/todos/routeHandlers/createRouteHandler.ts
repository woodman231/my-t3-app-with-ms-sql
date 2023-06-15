import {
    protectedProcedure,
} from "~/server/api/trpc";
import { createTodoRequestValidator } from "../routeHandlerModels/createTodoRequest";
import type { Prisma } from "@prisma/client";

export const createRouteHandler = protectedProcedure.input(createTodoRequestValidator).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const dataToInsert: Prisma.TodoCreateInput = {
        user: {
            connect: {
                id: userId
            }
        },
        title: input.title,
        dueDate: input.dueDate ? new Date(input.dueDate) : null,
        complete: input.complete
    }

    const results = await ctx.prisma.todo.create({ data: dataToInsert })

    return results;
})