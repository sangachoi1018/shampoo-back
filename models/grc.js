const mongoose = require("mongoose");


// grcSchema is a model that stores data of all the groceries items
const grcSchema = new mongoose.Schema({
  items: [{
    name: {type: String, unique: true}, 
    dates: {type: Array}
  }]
})

const grcModel = mongoose.model("Grc", grcSchema);
module.exports = grcModel;

