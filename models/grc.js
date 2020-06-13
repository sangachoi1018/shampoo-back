const mongoose = require("mongoose");

const {entModel, entrySchema} = require("./entry")

// // entrySchema contains data of each entry
// const entrySchema = new mongoose.Schema({
//   date: {type: Date, required: true},
//   unit: {type: Number, default: 1},
//   memo: {type: String, default: ""}
// })

// grcSchema is a model that stores data of all the groceries items
const grcSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true}, 
  entries: [entrySchema],
  inBasket: {type: Boolean, default:false, required: true},
  note: {type: String, default: ""}
})

const grcModel = mongoose.model("Grc", grcSchema);
module.exports = grcModel;