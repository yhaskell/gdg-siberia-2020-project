import * as Knex from "knex";
import { Product } from "../src/types/models";

const products: Product[] = require("./data/whisky.json");

export async function up(knex: Knex) {
  return knex("products").insert(products);
}

export async function down(knex: Knex) {
  return knex("products").delete();
}
