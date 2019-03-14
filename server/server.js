const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("./config/mongoose");
const cors = require("cors");
const app = express();

app.use("*", cors());

const todoSchema = require("./graphql").todoSchema;
app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: todoSchema,
    rootValue: global,
    graphiql: true
  })
);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`A GraphQL API running at port ${port}`);
  const db = mongoose();
});
