// app.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
// Connect to MongoDB
const dbConfig = require("./db");
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload());
// Routes
const indexRoute = require("./routes/index");
const logRoutes = require("./routes/logroutes");
const organisationRoutes = require("./routes/projectInfoRoutes");
app.use("/", indexRoute);
app.use("/logs", logRoutes);
app.use("/organisation", organisationRoutes);

// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
