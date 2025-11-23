/**
  {
    "api": 1,
    "name": "Extract SQL Tables",
    "description": "Extracts table names referenced in SQL query",
    "author": "Boop",
    "icon": "tablecells",
    "tags": "sql,tables,extract,database,query"
  }
**/

function main(state) {
  var sql = state.text.toUpperCase();
  var tables = new Set();
  
  // FROM clause
  var fromPattern = /FROM\s+([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)?)/gi;
  var match;
  while ((match = fromPattern.exec(state.text)) !== null) {
    tables.add(match[1]);
  }
  
  // JOIN clauses
  var joinPattern = /JOIN\s+([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)?)/gi;
  while ((match = joinPattern.exec(state.text)) !== null) {
    tables.add(match[1]);
  }
  
  // INSERT INTO
  var insertPattern = /INSERT\s+INTO\s+([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)?)/gi;
  while ((match = insertPattern.exec(state.text)) !== null) {
    tables.add(match[1]);
  }
  
  // UPDATE
  var updatePattern = /UPDATE\s+([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)?)/gi;
  while ((match = updatePattern.exec(state.text)) !== null) {
    tables.add(match[1]);
  }
  
  // DELETE FROM
  var deletePattern = /DELETE\s+FROM\s+([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)?)/gi;
  while ((match = deletePattern.exec(state.text)) !== null) {
    tables.add(match[1]);
  }
  
  // CREATE TABLE
  var createPattern = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)?)/gi;
  while ((match = createPattern.exec(state.text)) !== null) {
    tables.add(match[1]);
  }
  
  // ALTER TABLE
  var alterPattern = /ALTER\s+TABLE\s+([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)?)/gi;
  while ((match = alterPattern.exec(state.text)) !== null) {
    tables.add(match[1]);
  }
  
  var tableList = Array.from(tables).sort();
  
  if (tableList.length === 0) {
    state.postError("No table names found");
    return;
  }
  
  state.text = "Tables referenced (" + tableList.length + "):\n\n" + tableList.join("\n");
  state.postInfo("Found " + tableList.length + " table(s)");
}
