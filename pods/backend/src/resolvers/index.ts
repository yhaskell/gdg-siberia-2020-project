import { IResolvers } from "apollo-server-express";
import { Context } from "../types/context";
import Date from "./date";

const resolvers: IResolvers<any, Context> = {
  Date,

  Query: {
    hello: () => "Hello, World!"
  }
}

export default resolvers;
