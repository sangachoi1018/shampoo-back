const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const db = require("./models/");

app.use(cors());
app.use(bodyParser.json());

function success(res, payload) {
  return res.status(200).json(payload);
}

const todoRouter = require("./routes/todo")
const indexRouter = require("./routes/index")
const grcRouter = require("./routes/grc")
const entRouter = require("./routes/entry")

app.use('/', indexRouter)
app.use('/todos', todoRouter)
app.use('/grc', grcRouter)
app.use('/grc', entRouter)


app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request"
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});