import {
    protectedProcedure,
} from "~/server/api/trpc";
import { updateTodoRequestValidator } from "../routeHandlerModels/updateTodoRequest";
import type { Prisma } from "@prisma/client";

export const updateRouteHandler = protectedProcedure.input(updateTodoRequestValidator).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const updatedData: Prisma.TodoUpdateInput = {
        user: {
            connect: {
                id: userId
            }
        },
        title: input.title,
        dueDate: input.dueDate ? new Date(input.dueDate) : null,
        complete: input.complete
    }

    const results = await ctx.prisma.todo.update({where: {id: input.id}, data: updatedData})

    return results;
})