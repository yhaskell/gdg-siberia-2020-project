import Context from "../context";
import { Order, OrderItem, OrderLogEntry } from "../types/models";

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

export async function getOrderItemsByOrderIds(ctx: Context, ids: readonly string[]) {
  const items = await ctx.db.select("*").from<OrderItem>("order_items").whereIn("order_id", ids);

  return ids.map(id => items.filter(item => item.order_id === id));
}

export async function getOrderLogEntriesByOrderIds(ctx: Context, ids: readonly string[]) {
  const logs = await ctx.db.select("*").from<OrderLogEntry>("order_logs").whereIn("order_id", ids);

  return ids.map(id => logs.filter(logentry => logentry.order_id === id).map(e => ({ ...e, status: e.status.toUpperCase() })));
}