// routes/logRoutes.js
const express = require("express");
const router = express.Router();
const projectInfoController = require("../controllers/projectInfoController");

// POST create log entry
router.post(
  "/save-organisation-info",
  projectInfoController.createOrganisationEntry
);

// GET all log entries
router.get(
  "/get-organisation-info/:organisationId",
  projectInfoController.getOrganisationEntry
);

module.exports = router;
