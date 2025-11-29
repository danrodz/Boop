/**
  {
    "api": 1,
    "name": "JSON to SQL INSERT",
    "description": "Generates SQL INSERT statements from JSON array",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "json,sql,insert,generate,database"
  }
**/

function main(state) {
  var input = state.text.trim();
  
  // Check for table name on first line
  var tableName = "table_name";
  var json = input;
  
  var firstLine = input.split("\n")[0].trim();
  if (!firstLine.startsWith("[") && !firstLine.startsWith("{")) {
    tableName = firstLine;
    json = input.substring(input.indexOf("\n") + 1).trim();
  }
  
  var data;
  try {
    data = JSON.parse(json);
  } catch (e) {
    state.postError("Invalid JSON: " + e.message);
    return;
  }
  
  if (!Array.isArray(data)) {
    data = [data];
  }
  
  if (data.length === 0) {
    state.postError("No data to convert");
    return;
  }
  
  function escapeValue(val) {
    if (val === null || val === undefined) return "NULL";
    if (typeof val === "boolean") return val ? "TRUE" : "FALSE";
    if (typeof val === "number") return String(val);
    if (typeof val === "object") return "'" + JSON.stringify(val).replace(/'/g, "''") + "'";
    return "'" + String(val).replace(/'/g, "''") + "'";
  }
  
  var columns = Object.keys(data[0]);
  var statements = [];
  
  data.forEach(function(row) {
    var values = columns.map(function(col) {
      return escapeValue(row[col]);
    });
    
    statements.push(
      "INSERT INTO " + tableName + " (" + columns.join(", ") + ") VALUES (" + values.join(", ") + ");"
    );
  });
  
  state.text = statements.join("\n");
  state.postInfo("Generated " + statements.length + " INSERT statement(s)");
}
