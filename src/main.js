import React, { useState, useEffect } from "react";
import "./main.css";
import { getData } from "./api";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
const columns = [
  // { field: "id", headerName: "ID", width: 90, },
  {
    field: "time",
    headerName: "Time",
    width: 150,
  },
  {
    field: "logFileType",
    headerName: "Log File Type",
    width: 150,
  },
  {
    field: "logType",
    headerName: "Log Type",
    width: 150,
    renderCell: (params) => (
      <div
        style={{
          color:
            params.row.logType === "ERR" ||
            params.row.logType === "ERRO" ||
            params.row.logType === "ERROR"
              ? "#FF0000"
              : params.row.logType === "INFO"
              ? "#0000FF"
              : params.row.logType === "NOTICE"
              ? "#00FF00"
              : params.row.logType === "WARNING" ||
                params.row.logType === "WARN"
              ? "#ffcc00"
              : "",
        }}
      >
        {params.row.logType}
      </div>
    ),
  },
  {
    field: "manager",
    headerName: "Manager",
    width: 110,
  },
  {
    field: "processId",
    headerName: "Process Id",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
  },
  {
    field: "param1",
    headerName: "Param 1",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
  },
  {
    field: "message",
    headerName: "Message",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
  },
  {
    field: "logData",
    headerName: "Log Data",
    width: 600,
  },
];
const VISIBLE_FIELDS = [
  "id",
  "time",
  "logType",
  "logFileType",
  "processId",
  "param1",
  "message",
  "logData",
];
const Main = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getData("logs/get-logs/");
      let logData = response.map((item, index) => ({
        id: index + 1,
        time: item.logTime,
        logType: item.logType,
        logFileType: item.logFileType,
        manager: item.manager,
        processId: item.processId,
        param1: item.param1,
        message: item.message,
        logData: item.data,
      }));
      setData(logData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const { data1 } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });
  return (
    <div>
      <div className="head">MeLoDi-Log Analysis Tool </div>
      <div style={{ marginTop: "0.5rem" }}></div>
      <Box sx={{ height: 624, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          pageSizeOptions={[100]}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Main;
