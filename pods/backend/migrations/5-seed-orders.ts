import * as Knex from "knex";
import generateOrders from "./generators/orders";

export async function up(knex: Knex) {
  return await generateOrders(knex);
}

export async function down(knex: Knex) {
  await knex("orders").delete();
  await knex("order_items").delete();
  await knex("order_logs").delete();
}
