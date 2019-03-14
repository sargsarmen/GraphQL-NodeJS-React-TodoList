const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;
const TodoType = require("../types/todo");
const TodoModel = require("../../models/todo");

exports.update = {
  type: TodoType.todoType,
  args: {
    id: {
      name: "id",
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    return TodoModel.findByIdAndUpdate(
      params.id,
      { $set: { name: params.name } },
      { new: true }
    ).catch(err => new Error(err));
  }
};
