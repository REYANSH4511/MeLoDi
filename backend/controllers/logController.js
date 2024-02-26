// controllers/logController.js
const LogEntry = require("../models/logs");
const fs = require("fs").promises;
const { processFileData } = require("../helper");
const path = require("path");

exports.createLogEntry = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const logFileType = req.body.selectedValue;
    const fileData = req.files.file.data.toString(); // Convert buffer to string
    const allowedExtensions = [".txt"];
    const fileExtension = path.extname(req.files.file.name);
    if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
      return res.status(400).json({ error: "Only .txt files are allowed" });
    }
    const logEntries = await processFileData(fileData, logFileType);
    if (logEntries.length <= 0) {
      return res
        .status(400)
        .json({ error: "No logs matched with avaiable patterns." });
    }
    await LogEntry.insertMany(logEntries);
    console.log("Finished reading log file.");
    return res.status(200).json({ message: "Log entries saved" });
  } catch (error) {
    console.error("Error processing log file:", error);
    next(error);
  }
};

exports.getAllLogEntries = async (req, res, next) => {
  try {
    const logEntries = await LogEntry.find();
    res.json(logEntries);
  } catch (error) {
    next(error);
  }
};
