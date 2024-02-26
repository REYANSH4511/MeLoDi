// src/App.js
import React from "react";
import "./App.css"; // Import your CSS file
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GitCodePage from "./GitCodePage";
import UploadLogsPage from "./uploadLogsPage";
import Main from "./main";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UploadLogsPage />} />
        <Route path="/show-logs" element={<Main />} />
        <Route path="/git-code/:id" element={<GitCodePage />} />
        {/* <Route path="/upload-logs" element={<GitCodePage />} /> */}
      </Routes>
    </>
  );
};

export default App;
