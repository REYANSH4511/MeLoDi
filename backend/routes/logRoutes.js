// routes/logRoutes.js
const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController");

// POST create log entry
router.post("/save-logs", logController.createLogEntry);

// GET all log entries
router.get("/get-logs", logController.getAllLogEntries);

module.exports = router;
