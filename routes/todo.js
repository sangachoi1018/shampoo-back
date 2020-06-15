// todo.js - To Do route module

var express = require('express');
var router = express.Router();
const db = require("../models/");

function success(res, payload) {
  return res.status(200).json(payload);
}


router.get("/", async (req, res, next) => {
  try {
    const todos = await db.Todo.find({});
    return success(res, todos);
  } catch (err) {
    next({ status: 400, message: "failed to get basket" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const todo = await db.Todo.create(req.body);
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "failed to create an item in basket" });
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return success(res, todo);
  } catch (err) {
     
    next({ status: 400, message: "failed to update an item in basket" });
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await db.Todo.findByIdAndRemove(req.params.id);
    return success(res, "item deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete an item in basket" });
  }
});

module.exports = router;
