import Knex from "knex";
import { v4 as uuid } from "uuid";
import { Product, User } from "../../src/types/models";
import { pick, random, randomDate, times } from "./utils";

const whiskys: Product[] = require("../data/whisky.json");

const statuses = (() => {
  const res: string[] = [];
  times(2, () => res.push("queued"));
  times(3, () => res.push("processed"));
  times(5, () => res.push("shipped"));
  times(25, () => res.push("delivered"));
  times(1, () => res.push("cancelled"));

  return res;
})();

const sdeps: Record<string, string | null> = {
  queued: null,
  processed: "queued",
  shipped: "processed",
  delivered: "shipped",
  cancelled: "queued"
};

const days = 86400000;

const diffs: Record<string, number> = {
  queued: 0,
  processed: 0.25 * days,
  shipped: 2 * days,
  delivered: 28 * days,
  cancelled: 28 * days,
};

function is(status: string, required: string) {
  let s: string | null = status;
  while (s) {
    if (s === required) return true;
    s = sdeps[s];
  }
  return false;
}

function generateOrder(user_ids: string[]) {
  const id = uuid();

  const items = times(random(1, 5, 0), () => ({ item: pick(whiskys), count: random(1, 10, 0) }));

  const uniqueItems = Object.values(Object.fromEntries(items.map(item => [item.item.id, item])));

  const originalPrice = +uniqueItems.reduce((res, { item, count }) => res + count * item.price, 0).toFixed(2);
  const discountedPrice = Math.random() > 0.8 ? +(originalPrice * random(0.7, 1)).toFixed(2) : null;
  
  const status = pick(statuses);
  const user_id = pick(user_ids);

  const log = [];
  let date = randomDate(new Date(2012, 0, 1), 2000);
  for (let stat of Object.keys(sdeps)) { 
    if (is(status, stat)) {
      log.push({ status: stat, date });
      date = randomDate(date, diffs[stat]);
    }
  }

  const order = {
    id,
    original_price: originalPrice,
    discounted_price: discountedPrice,
    status,
    user_id,
  };

  return {
    order,
    items: uniqueItems.map(item => ({
      order_id: id, 
      item_id: item.item.id,
      count: item.count,
    })),
    logs: log.map(le => ({
      ...le,
      order_id: id,
    })),
  };
}

async function saveOrders(knex: Knex, orders: ReturnType<typeof generateOrder>[]) {
  const taorders = orders.map(o => o.order);
  const taitems = orders.flatMap(o => o.items);
  const talogs = orders.flatMap(o => o.logs);

  await knex("orders").insert(taorders);
  await knex("order_items").insert(taitems);
  await knex("order_logs").insert(talogs);
}

export default async function generateOrders(knex: Knex) {
  const users = await knex.select("id").from<User>("users");
  const user_ids = users.map(u => u.id);

  let orders = [];

  for (let i = 1; i <= random(200000, 500000); i++) {
    orders.push(generateOrder(user_ids));
    if (i % 1000 === 0) {
      await saveOrders(knex, orders);
      console.log("Generated", i, "elements");
      orders = [];
    }
  }
  if (orders.length > 0) {
    await saveOrders(knex, orders);
  }
}
