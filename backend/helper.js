const processLine = (line, logFileType) => {
  const regexPatterns = [
    /^(\w{3}\s+\d{1,2} \d{2}:\d{2}:\d{2}) (\w+)\[(\d+)\]: <(\w+)> *(.*?)$/,
    /^(\d+):(\w{3} \d{1,2} \d{2}:\d{2}:\d{2}) (\w+)\[(\d+)\]: <(\w+)> *(.*)$/,
    /^(\w{3}\s+\d{1,2}\s\d{2}:\d{2}:\d{2})\s(\w+)\[(\d+)\]:\s*<(\w+)>\s+(.*)/,
    /^(\w{3}\s+\d{1,2} \d{2}:\d{2}:\d{2}) (\S+): (\S+):\s*(\S+)\s*(.*)/,
    /^(\d{2}:\d{2}:\d{2})\s*\u001b\[\d+m\s*(.*?)\s*\u001b\[0m.*?(\[.*?\])\s*(.*?)\s*$/,
  ];

  for (let i = 0; i < regexPatterns.length; i++) {
    const match = line.match(regexPatterns[i]);
    if (match) {
      let [_, timestamp, ...rest] = match;
      if (i === 2) {
        return {
          logTypeId: `LT${i + 1}`,
          logFileType: logFileType,
          data: line,
          ...parseMatchedData(rest, i),
        };
      }
      return {
        logTime: timestamp,
        logFileType: logFileType,
        logTypeId: `LT${i + 1}`,
        data: line,
        ...parseMatchedData(rest, i),
      };
    }
  }
  return null;
};

const parseMatchedData = (data, logFileType) => {
  const [managerName, processId, logLevel, message] = data;
  if (logFileType === 1) {
    const [timestamp, managerName, processId, logLevel, message] = data;
    return {
      manager: managerName ? managerName.trim() : "",
      logTime: timestamp,
      processId: parseInt(processId),
      logType: logLevel,
      message,
    };
  }
  if (logFileType === 3) {
    return {
      param1: managerName ? managerName.trim() : "",
      logType: "MISC",
      message,
    };
  }
  if (logFileType === 4) {
    let [logLevel, processId, message] = data;
    if (logLevel === "[1mERRO") {
      logLevel = "ERRO";
    }
    return {
      logType: logLevel,
      message,
    };
  }
  return {
    manager: managerName ? managerName.trim() : "",
    processId: parseInt(processId),
    logType: logLevel,
    message,
  };
};

const processFileData = async (fileData, logFileType) => {
  const lines = fileData.split("\n");
  const logEntries = [];

  for (const line of lines) {
    const logEntry = processLine(line, logFileType);
    if (logEntry) {
      logEntries.push(logEntry);
    }
  }

  return logEntries;
};

module.exports = {
  processFileData,
};
