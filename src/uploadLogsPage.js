import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { postData } from "./api";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./uplodLogsPage.css";

const UploadLogsPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("selectedValue", selectedValue);
    try {
      const response = await postData("logs/save-logs/", formData);
      if (response.message === "Log entries saved") {
        setShowNextButton(true);
        handleSnackbarOpen("success", response.message);
      } else {
        console.error("Error:", response.statusText);
      }
      setLoading(false);
    } catch (error) {
      handleSnackbarOpen("error", error.error);
      console.error("Error sending data to API:", error);
      setLoading(false);
    }
  };

  const handleNextButtonClick = () => {
    navigate("/show-logs");
  };
  return (
    <>
      <div className="head">MeLoDi-Log Analysis Tool </div>
      {/* <h2>Upload Logs Here</h2> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="file"
          id="fileInput"
          accept=".txt"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div style={{ marginTop: "2rem" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select File Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedValue}
              defaultValue="Data"
              style={{ width: "20vw" }}
              label="Select File Type"
              onChange={handleSelectChange}
            >
              <MenuItem value="Data">Data</MenuItem>
              <MenuItem value="Test">Test</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          onClick={() => document.getElementById("fileInput").click()}
          style={{ marginTop: "1rem" }}
        >
          Upload File
        </Button>
        {file && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              marginTop: "1rem",
              background: "#0366fc",
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? "Uploading..." : "Submit"}
          </Button>
        )}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      {/* {showNextButton && ( */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleNextButtonClick}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#0366fc",
        }}
      >
        View Logs
      </Button>
      {/* )}  */}
    </>
  );
};

export default UploadLogsPage;
