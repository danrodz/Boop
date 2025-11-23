/**
  {
    "api": 1,
    "name": "Table to JSON",
    "description": "Converts ASCII/Markdown tables to JSON array",
    "author": "Boop",
    "icon": "tablecells",
    "tags": "table,json,markdown,convert,data"
  }
**/

function main(state) {
  var lines = state.text.trim().split("\n");
  
  // Filter out separator lines (---|---) and empty lines
  lines = lines.filter(function(line) {
    line = line.trim();
    return line && !/^[\|\s\-:]+$/.test(line);
  });
  
  if (lines.length < 2) {
    state.postError("Need at least header and one data row");
    return;
  }
  
  function parseLine(line) {
    // Remove leading/trailing pipes
    line = line.replace(/^\||\|$/g, "").trim();
    // Split by pipe and trim each cell
    return line.split("|").map(function(cell) {
      return cell.trim();
    });
  }
  
  var headers = parseLine(lines[0]);
  var data = [];
  
  for (var i = 1; i < lines.length; i++) {
    var values = parseLine(lines[i]);
    var obj = {};
    
    for (var j = 0; j < headers.length; j++) {
      var value = values[j] || "";
      // Try to parse numbers
      if (/^-?\d+\.?\d*$/.test(value)) {
        value = parseFloat(value);
      } else if (value === "true") {
        value = true;
      } else if (value === "false") {
        value = false;
      } else if (value === "null") {
        value = null;
      }
      obj[headers[j]] = value;
    }
    
    data.push(obj);
  }
  
  state.text = JSON.stringify(data, null, 2);
  state.postInfo("Converted " + data.length + " rows to JSON");
}
