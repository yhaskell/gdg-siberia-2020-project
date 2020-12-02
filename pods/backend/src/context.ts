import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import DataLoader from "dataloader";
import Knex from "knex";
import service from "./services";
import { Distillery, Order, OrderItem, OrderLogEntry, Product, User } from "./types/models";

function makeLoaders(context: Context) {
  const distillery = new DataLoader<string, Distillery>(ids => service.distilleries.getDistilleriesByIds(context, ids));
  const orderByUserId = new DataLoader<string, Order[]>(ids => service.orders.getOrdersByUserIds(context, ids));
  const userByDistilleryId = new DataLoader<string, User[]>(ids => service.users.getUsersByDistilleryIds(context, ids));
  const productByDistilleryId = new DataLoader<string, Product[]>(ids => service.products.getProductsByDistilleryIds(context, ids));
  const product = new DataLoader<string, Product>(ids => service.products.getProductsByIds(context, ids));
  const orderItems = new DataLoader<string, OrderItem[]>(ids => service.orders.getOrderItemsByOrderIds(context, ids));
  const orderLogs = new DataLoader<string, OrderLogEntry[]>(ids => service.orders.getOrderLogEntriesByOrderIds(context, ids));

  return {
    distillery,
    orderByUserId,
    userByDistilleryId,
    productByDistilleryId,
    productsByIds: product,
    orderItems,
    orderLogs,
  };
}

export default class Context {
  constructor(public ctx: ExpressContext, public db: Knex) {
    this.loaders = makeLoaders(this);
  }

  loaders: ReturnType<typeof makeLoaders>;
}