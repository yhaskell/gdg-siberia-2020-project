import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable("users", (table) => {
      table.uuid("id").notNullable().primary();
      table.uuid("distillery_id").notNullable();
      table.string("name").notNullable();
      table.string("email").notNullable();
    })
    .createTable("distilleries", (table) => {
      table.uuid("id").notNullable().primary();
      table.string("name").notNullable();
    })
    .createTable("products", (table) => {
      table.uuid("id").notNullable().primary();
      table.uuid("distillery_id").notNullable();
      table.string("name").notNullable();
      table.float("rating").notNullable();
      table.string("type").notNullable();
      table.float("price").notNullable();
    })
    .createTable("orders", (table) => {
      table.uuid("id").notNullable().primary();
      table.float("original_price").notNullable();
      table.float("discounted_price");
      table.string("status");
      table.uuid("user_id");
    })
    .createTable("order_items", (table) => {
      table.uuid("order_id").notNullable();
      table.uuid("item_id").notNullable();
      table.integer("count").notNullable();
      table.primary(["order_id", "item_id"]);
    })
    .createTable("order_logs", (table) => {
      table.uuid("order_id").notNullable();
      table.string("status").notNullable();
      table.dateTime("date").notNullable();
      table.primary(["order_id", "status"]);
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .dropTable("users")
    .dropTable("distilleries")
    .dropTable("products")
    .dropTable("orders")
    .dropTable("order_items")
    .dropTable("order_logs");
}
