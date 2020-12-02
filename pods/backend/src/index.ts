import express from "express";
import morgan from "morgan";
import { ApolloServer, gql } from "apollo-server-express";

const app = express();
app.use(morgan("dev"));

const typeDefs = gql`
type User {
  id: ID!
  name: String!
}

type Query {
  hello: String
}
`;

const resolvers = {
  Query: {
    hello: () => "hello"
  }
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  uploads: false,

});

server.applyMiddleware({ app });

app.listen(5211);