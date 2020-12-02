import { Context } from "../types/context";
import { Order } from "../types/models";

export async function getOrderById(ctx: Context, id: string) {
  const [order] = await ctx.connection.select("*").from<Order>("orders").where({ id });

  return order;
}