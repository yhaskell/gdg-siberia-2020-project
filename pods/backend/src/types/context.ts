import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import Knex from "knex";

export interface Context {
  ctx: ExpressContext;
  connection: Knex;
}