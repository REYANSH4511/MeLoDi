const mongoose = require("mongoose");

const logEntrySchema = new mongoose.Schema(
  {
    logTime: {
      type: String,
    },
    message: {
      type: String,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    logTypeId: {
      type: mongoose.Schema.Types.String,
    },
    fileName: {
      type: mongoose.Schema.Types.String,
    },
    logType: {
      type: mongoose.Schema.Types.String,
    },
    manager: {
      type: mongoose.Schema.Types.String,
    },
    param1: {
      type: mongoose.Schema.Types.String,
    },
    processId: {
      type: mongoose.Schema.Types.Number,
    },
    lineNo: {
      type: mongoose.Schema.Types.String,
    },
    logFileType: {
      type: mongoose.Schema.Types.String,
      enum: ["Test", "Data"],
    },
  },
  { timestamps: true }
);

const LogEntry = mongoose.model("LogEntry", logEntrySchema);

module.exports = LogEntry;
