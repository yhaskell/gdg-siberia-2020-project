import * as Knex from "knex";
import generateUsers from "./generators/users";

export async function up(knex: Knex) {
  const users = generateUsers();

  return knex("users").insert(users);
}

export async function down(knex: Knex) {
  return knex("users").delete();
}
