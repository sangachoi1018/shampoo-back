const mongoose = require("mongoose");


// new document
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    unique: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
