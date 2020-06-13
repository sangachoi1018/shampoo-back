var express = require('express');
const db = require("../models/");
var router = express.Router();


function success(res, payload) {
  return res.status(200).json(payload);
}

router.get("/", async (req, res, next) => {
  try {
    const grcs = await db.Grc.find({});
    return success(res, grcs);
  } catch (err) {
    next({ status: 400, message: "failed to get groceries" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const grc = await db.Grc.create(req.body);
    return success(res, grc);
  } catch (err) {
    next({ status: 400, message: "failed to create a grocery" });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const grc = await db.Grc.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return success(res, grc);
  } catch (err) {
    next({ status: 400, message: "failed to update a grocery" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await db.Grc.findByIdAndRemove(req.params.id);
    return success(res, "a grocery item deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete a grocery item" });
  }
});



module.exports = router;
