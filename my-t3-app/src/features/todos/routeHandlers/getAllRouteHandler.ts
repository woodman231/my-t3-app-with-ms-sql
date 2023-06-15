import {  
  protectedProcedure,
} from "~/server/api/trpc";

export const getAllRouteHandler = protectedProcedure.query(async ({ctx}) => {
    const userId = ctx.session.user.id;
    const results = await ctx.prisma.todo.findMany({where: { userId: userId }})    

    return results;
});