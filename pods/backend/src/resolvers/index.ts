import { IResolvers } from "apollo-server-express";
import Context from "../context";
import Date from "./date";

import service from "../services";
import { Distillery, Order, OrderItem, Product, User } from "../types/models";

const resolvers: IResolvers<any, Context> = {
  Date,
  User: {
    distillery: (parent: User, args: any, ctx) => ctx.loaders.distillery.load(parent.distillery_id),
    orders: (parent: User, args: any, ctx) => ctx.loaders.orderByUserId.load(parent.id),
  },
  Distillery: {
    users: (parent: Distillery, args: any, ctx) => ctx.loaders.userByDistilleryId.load(parent.id),
    products: (parent: Distillery, args: any, ctx) => ctx.loaders.productByDistilleryId.load(parent.id),
  },
  Order: {
    items: (parent: Order, args: any, ctx) => ctx.loaders.orderItems.load(parent.id),
    log: (parent: Order, args: any, ctx) => ctx.loaders.orderLogs.load(parent.id),
  },
  OrderItem: {
    product: (parent: OrderItem, args: any, ctx) => ctx.loaders.productsByIds.load(parent.product_id),
  },
  Product: {
    distillery: (parent: Product, args: any, ctx) => ctx.loaders.distillery.load(parent.distillery_id),
  },
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
