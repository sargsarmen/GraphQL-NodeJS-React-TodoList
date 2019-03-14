const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true
  },
  modifiedDate: {
    type: Date,
    required: true
  }
});
const Model = mongoose.model("Todo", todoSchema);
module.exports = Model;
