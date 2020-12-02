import Context from "../context";
import { Order } from "../types/models";

function mapOrder(order: Order) {
  return {
    ...order,
    price: order.original_price,
    discountedPrice: order.discounted_price,
    status: order.status.toUpperCase(),
  }
}

export async function getOrderById(ctx: Context, id: string) {
  const [order] = await ctx.db.select("*").from<Order>("orders").where({ id });

  return mapOrder(order);
}

export async function getOrdersByUserIds(ctx: Context, ids: readonly string[]) {
  const orders = await ctx.db.select("*").from<Order>("orders").whereIn("user_id", ids);

  return ids.map(id => orders.filter(o => o.user_id == id).map(mapOrder));
}