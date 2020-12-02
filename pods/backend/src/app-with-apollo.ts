import { ApolloServer, gql } from "apollo-server-express";
import { readFileSync } from "fs";
import * as path from "path";
import express from "express";
import Knex from "knex";
import morgan from "morgan";

import resolvers from "./resolvers";
import Context from "./context";

const schema = readFileSync(path.resolve(__dirname, "../schema.graphql"), "utf-8");

const typeDefs = gql`${schema}`;

export default function initializeServer(connection: Knex) {
  const app = express();
  app.use(morgan("combined"));

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    uploads: false,
    context: (ctx) => new Context(ctx, connection),
  });

  server.applyMiddleware({ app });

  app.listen(5211);

  return { app, server };
}
