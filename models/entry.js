const mongoose = require("mongoose");
// entrySchema contains data of each entry
const entrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  unit: { type: Number, default: 1 },
  memo: { type: String, default: "" }
})

const entModel = mongoose.model("Entry", entrySchema)

module.exports = { entModel: entModel, entrySchema: entrySchema};