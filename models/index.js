const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-app', {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("DB connected!")
});


mongoose.set('debug', true);
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");