const mongoose = require("mongoose");

const projectInfoSchema = new mongoose.Schema(
  {
    organisation: {
      type: String,
      required: true,
    },
    gitLink: {
      type: String,
      default: {},
    },
  },
  { timestamps: true }
);

const ProjectInfo = mongoose.model("projectInfo", projectInfoSchema);

module.exports = ProjectInfo;
