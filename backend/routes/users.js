const express = require("express");
const router = express.Router();

/* GET users listing. */
router.post("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET test route. */
router.get("/test", function (req, res, next) {
  res.json({ message: "This is a test route", status: "success" });
});

module.exports = router;
