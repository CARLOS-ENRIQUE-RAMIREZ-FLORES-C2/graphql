"use strict";

const { graphql, buildSchema } = require("graphql");
const express = require("express");
const gqlMiddleware = require("express-graphql");

const app = express();
const port = process.env.port || 3005;

///definiendo el esquema
const schema = buildSchema(`
type Query {
    hello: String,
    saludo: String
}
`);

//configurar resolver, se ejecutan justo despues de que se terme de hacer el query
const resolvers = {
  hello: () => {
    return "Hola Mundito!";
  },
  saludos: () => {
    return "Hol a todos";
  },
};

app.use('/api', gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  }))
  
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/api`);
  })
