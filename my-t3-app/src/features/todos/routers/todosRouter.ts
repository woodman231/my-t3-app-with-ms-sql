import {
  createTRPCRouter
} from "~/server/api/trpc";
import { getAllRouteHandler } from "../routeHandlers/getAllRouteHandler"
import { createRouteHandler } from "../routeHandlers/createRouteHandler"
import { updateRouteHandler } from "../routeHandlers/updateRouteHandler"
import { getOneRouteHandler } from "../routeHandlers/getOneRouteHandler"
import { deleteOneRouteHandler } from "../routeHandlers/deleteOneRouteHandler"

export const todosRouter = createTRPCRouter({
  getAll: getAllRouteHandler,
  getOne: getOneRouteHandler,
  create: createRouteHandler,
  update: updateRouteHandler,
  delete: deleteOneRouteHandler,
})