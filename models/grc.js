const mongoose = require("mongoose");

const grcSchema = new mongoose.Schema({
  grocery: {
    type: String,
    unique: true,
    required: true
  }
})

// const todoSchema = new mongoose.Schema({
//   task: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// });

// const todoModel = mongoose.model("Todo", todoSchema);

// module.exports = todoModel;
