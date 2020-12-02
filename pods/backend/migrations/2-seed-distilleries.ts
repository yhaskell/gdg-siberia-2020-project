import * as Knex from "knex";
import { Distillery } from "../src/types/models";

const distilleries: Distillery[] = require("./data/distilleries.json");

export async function up(knex: Knex) {
  return knex("distilleries").insert(distilleries);
}

export async function down(knex: Knex) {
  return knex("distilleries").delete();
}
