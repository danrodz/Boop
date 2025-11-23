/**
  {
    "api": 1,
    "name": "SQL Formatter",
    "description": "Formats SQL queries with proper indentation and keyword casing",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "sql,format,query,database,indent"
  }
**/

function main(state) {
  var sql = state.text;
  
  var keywords = [
    "SELECT", "FROM", "WHERE", "AND", "OR", "JOIN", "LEFT JOIN", "RIGHT JOIN",
    "INNER JOIN", "OUTER JOIN", "FULL JOIN", "CROSS JOIN", "ON", "AS",
    "ORDER BY", "GROUP BY", "HAVING", "LIMIT", "OFFSET", "UNION", "UNION ALL",
    "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE",
    "ALTER TABLE", "DROP TABLE", "CREATE INDEX", "DROP INDEX", "PRIMARY KEY",
    "FOREIGN KEY", "REFERENCES", "NOT NULL", "DEFAULT", "UNIQUE", "CHECK",
    "IN", "NOT IN", "EXISTS", "NOT EXISTS", "BETWEEN", "LIKE", "IS NULL",
    "IS NOT NULL", "CASE", "WHEN", "THEN", "ELSE", "END", "DISTINCT",
    "COUNT", "SUM", "AVG", "MIN", "MAX", "COALESCE", "NULLIF", "CAST"
  ];
  
  // Normalize whitespace
  sql = sql.replace(/\s+/g, " ").trim();
  
  // Uppercase keywords
  keywords.sort(function(a, b) { return b.length - a.length; });
  keywords.forEach(function(kw) {
    var regex = new RegExp("\\b" + kw.replace(/ /g, "\\s+") + "\\b", "gi");
    sql = sql.replace(regex, kw);
  });
  
  // Add newlines before major clauses
  var majorClauses = ["SELECT", "FROM", "WHERE", "ORDER BY", "GROUP BY", "HAVING", 
                      "LIMIT", "UNION", "INSERT INTO", "VALUES", "UPDATE", "SET",
                      "DELETE FROM", "CREATE TABLE", "ALTER TABLE"];
  majorClauses.forEach(function(clause) {
    sql = sql.replace(new RegExp("\\b" + clause + "\\b", "g"), "\n" + clause);
  });
  
  // Add newlines and indentation for JOINs
  sql = sql.replace(/\b(LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN|FULL JOIN|CROSS JOIN|JOIN)\b/g, "\n  $1");
  
  // Add newlines for AND/OR in WHERE clauses
  sql = sql.replace(/\b(AND|OR)\b/g, "\n    $1");
  
  // Handle ON clauses
  sql = sql.replace(/\bON\b/g, "\n    ON");
  
  // Clean up and trim
  sql = sql.trim().replace(/\n\s*\n/g, "\n");
  
  state.text = sql;
  state.postInfo("SQL formatted");
}
