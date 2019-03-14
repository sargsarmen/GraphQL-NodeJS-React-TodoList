const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const TodoModel = require("../../models/todo");
const todoType = require("../types/todo").todoType;

// Query
exports.queryType = new GraphQLObjectType({
  name: "todos",
  fields: function() {
    return {
      todos: {
        type: new GraphQLList(todoType),
        resolve: function() {
          const todos = TodoModel.find().exec();
          if (!todos) {
            throw new Error("Error");
          }
          return todos;
        }
      }
    };
  }
});
