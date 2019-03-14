const addTodo = require("./add").add;
const removeTodo = require("./remove").remove;
const updateTodo = require("./update").update;

module.exports = {
  addTodo,
  removeTodo,
  updateTodo
};
