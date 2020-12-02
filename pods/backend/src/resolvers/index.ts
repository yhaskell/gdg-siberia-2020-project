import { IResolvers } from "apollo-server-express";
import { Context } from "../types/context";
import Date from "./date";

import service from "../services";



const resolvers: IResolvers<any, Context> = {
  Date,

  Query: {
    products: (parent: any, __, ctx) => service.products.getAllProducts(ctx),
    distilleries: (parent: any, __, ctx) => service.distilleries.getAllDistilleries(ctx),
    distillery: (parent: any, { id }: { id: string }, ctx) => service.distilleries.getDistilleryById(ctx, id),
    userByEmail: (parent: any, { email }: { email: string }, ctx) => service.users.getUserByEmail(ctx, email),
    user: (parent: any, { id }: { id: string }, ctx) => service.users.getUserById(ctx, id),
    order: (parent: any, { id }: { id: string }, ctx) => service.orders.getOrderById(ctx, id),
    hello: () => "Hello, World!",
  },
};

export default resolvers;
