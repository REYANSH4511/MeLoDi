// controllers/logController.js
const ProjectInfo = require("../models/projectInfo");

exports.createOrganisationEntry = async (req, res, next) => {
  try {
    const { organisation, gitLink } = req.body;
    const organisationEntry = new ProjectInfo({ organisation, gitLink });
    await organisationEntry.save();
    res.json(organisationEntry);
  } catch (error) {
    next(error);
  }
};

exports.getOrganisationEntry = async (req, res, next) => {
  try {
    organisationId = req.params.organisationId;
    const organisationEntry = await ProjectInfo.find({ _id: organisationId });
    res.json(organisationEntry);
  } catch (error) {
    next(error);
  }
};
