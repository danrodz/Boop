/**
  {
    "api": 1,
    "name": "JSON to Markdown Table",
    "description": "Converts JSON array to Markdown table",
    "author": "Boop",
    "icon": "tablecells",
    "tags": "json,table,markdown,convert,data"
  }
**/

function main(state) {
  var data;
  try {
    data = JSON.parse(state.text);
  } catch (e) {
    state.postError("Invalid JSON: " + e.message);
    return;
  }
  
  if (!Array.isArray(data) || data.length === 0) {
    state.postError("JSON must be a non-empty array of objects");
    return;
  }
  
  // Get all unique headers
  var headerSet = {};
  data.forEach(function(row) {
    Object.keys(row).forEach(function(key) {
      headerSet[key] = true;
    });
  });
  var headers = Object.keys(headerSet);
  
  // Calculate column widths
  var widths = {};
  headers.forEach(function(h) {
    widths[h] = h.length;
  });
  data.forEach(function(row) {
    headers.forEach(function(h) {
      var val = String(row[h] === undefined ? "" : row[h]);
      widths[h] = Math.max(widths[h], val.length);
    });
  });
  
  // Build table
  function padRight(str, len) {
    str = String(str);
    while (str.length < len) str += " ";
    return str;
  }
  
  var lines = [];
  
  // Header row
  var headerRow = "| " + headers.map(function(h) {
    return padRight(h, widths[h]);
  }).join(" | ") + " |";
  lines.push(headerRow);
  
  // Separator row
  var sepRow = "| " + headers.map(function(h) {
    return "-".repeat(widths[h]);
  }).join(" | ") + " |";
  lines.push(sepRow);
  
  // Data rows
  data.forEach(function(row) {
    var dataRow = "| " + headers.map(function(h) {
      var val = row[h] === undefined ? "" : row[h];
      return padRight(val, widths[h]);
    }).join(" | ") + " |";
    lines.push(dataRow);
  });
  
  state.text = lines.join("\n");
  state.postInfo("Created table with " + data.length + " rows");
}
