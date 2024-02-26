import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";

const showLogData = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9000/logs/get-logs/");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = (e, item, index) => {
    navigate(`/git-code/${index + 1}`, {
      state: { file: item.fileName, line: item.lineNo },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="head">MeLoDi-Log Analysis Tool </div>
      <div className="log-info"></div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Log Type</th>
            <th>Log Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{item.message}</td>
              <td className="data" onClick={(e) => handleClick(e, item, index)}>
                {item.data}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default showLogData;
