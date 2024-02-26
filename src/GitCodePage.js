import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { useLocation, useParams } from "react-router-dom";
// import NavBar from './NavBar';
const GitCodePage = ({}) => {
  const [gitCode, setGitCode] = useState("");
  const [line, setLine] = useState(0);
  const location = useLocation();
  const [theme, setTheme] = useState("vs-light");
  const getGitCode = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/REYANSH4511/Melodi-Poc-Log-c-/contents/${location.state.file}`,
        {
          headers: {
            Accept: "application/vnd.github.v3.raw",
          },
        }
      );

      const code = await response.data;
      setGitCode(code);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const setDarkTheme = (e) => {
    e.preventDefault();
    setTheme((prev) => (prev === "vs-dark" ? "hc-black" : "vs-dark"));
  };

  const setLightTheme = (e) => {
    e.preventDefault();
    setTheme("vs-light");
  };
  useEffect(() => {
    setLine(Number(location.state.line));
    getGitCode();
  }, []);

  const options = {
    autoIndent: "full",
    contextmenu: true,
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
  };

  return (
    <div>
      <div>
        <button onClick={setDarkTheme} type="button">
          Set dark theme ({theme === "vs-dark" ? "hc-black" : "vs-dark"})
        </button>
        {theme !== "vs-light" && (
          <button onClick={setLightTheme} type="button">
            Set light theme
          </button>
        )}
      </div>
      <hr />
      <>
        <Editor
          height="100vh"
          width="auto"
          options={options}
          theme={theme}
          value={gitCode}
          line={line}
          key={Math.random()}
        />
      </>
    </div>
  );
};

export default GitCodePage;
