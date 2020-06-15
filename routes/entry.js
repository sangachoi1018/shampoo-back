var express = require('express');
const db = require("../models/");
var router = express.Router();

function success(res, payload) {
  return res.status(200).json(payload);
}

// entry

router.get("/:id/entries", async (req, res, next) => {
  try {
    const grc = await db.Grc.findById(req.params.id, function (err, adv) { }); // document
    const entries = grc.entries
    return success(res, entries);
  }

  catch (err) {
    next({ status: 400, message: "failed to get entries" });
  }
});



router.put("/:id/entries", async (req, res, next) => {
  try {

    var grc = await db.Grc.findById(req.params.id, function (err, adv) { }); // document
    grc.entries.push(req.body);
    grc.save();
    const newGrc = grc;
    return success(res, newGrc);

  }

  catch (err) {
    next({ status: 400, message: "failed to update entries of a grocery item" });
  }
});


router.delete("/:id/entries/:entryId", async (req, res, next) => {
  try {
    var grc = await db.Grc.findById(req.params.id, function (err, adv) { }); // document
    grc.entries = grc.entries.filter(entry => {
      entry._id !== req.params.entryId
    });
    grc.save();
    return success(res, "a grocery item deleted");
  } catch (err) {
    next({ status: 400, message: "failed to delete a entry" });
  }
})

module.exports = router;
