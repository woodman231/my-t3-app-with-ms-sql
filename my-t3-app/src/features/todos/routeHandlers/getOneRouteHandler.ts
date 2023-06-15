import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
    protectedProcedure,
} from "~/server/api/trpc";

const inputObject = z.object({
    id: z.string(),
});

export const getOneRouteHandler = protectedProcedure.input(inputObject).query( async ({ ctx, input }) => {
    const todoId = input.id;
    const todoEntity = await ctx.prisma.todo.findFirst({ where: { id: todoId } })
    if(!todoEntity) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: `Unable to find Todo by Id: ${todoId}`
        })
    }

    const userId: string = ctx.session.user.id
    if(userId !== todoEntity.userId) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not authorized to view this Todo"
        })
    }

    return todoEntity;
});
