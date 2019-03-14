const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;
const TodoType = require("../types/todo");
const TodoModel = require("../../models/todo");

exports.add = {
  type: TodoType.todoType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const tModel = new TodoModel(params);
    const now = new Date();

    tModel.modifiedDate = now;
    tModel.createdDate = now;

    const todoModel = tModel.save();
    if (!todoModel) {
      throw new Error("Error");
    }
    return todoModel;
  }
};
