const mongoose = require("mongoose");


// new document
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    unique: true,
    required: true
  },
  checked: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
