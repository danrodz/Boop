/**
  {
    "api": 1,
    "name": "SQL Pretty Print (Advanced)",
    "description": "Advanced SQL formatting with proper indentation",
    "author": "Boop",
    "icon": "cylinder",
    "tags": "sql,format,pretty,indent"
  }
**/

function main(state) {
  try {
    let sql = state.text.trim();

    // Keywords that should be on new lines
    const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN',
                      'INNER JOIN', 'OUTER JOIN', 'ON', 'GROUP BY', 'HAVING',
                      'ORDER BY', 'LIMIT', 'OFFSET', 'UNION', 'AND', 'OR'];

    let result = sql;

    // Add newlines before major keywords
    const majorKeywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY', 'LIMIT'];
    for (let keyword of majorKeywords) {
      result = result.replace(new RegExp(`\\b${keyword}\\b`, 'gi'), `\n${keyword.toUpperCase()}`);
    }

    // Add newlines and indent for AND/OR
    result = result.replace(/\b(AND|OR)\b/gi, '\n  $1');

    // Add newlines for JOIN conditions
    result = result.replace(/\b(ON)\b/gi, '\n  $1');

    // Clean up multiple newlines
    result = result.replace(/\n\s*\n/g, '\n');

    // Add indentation for comma-separated columns
    result = result.replace(/,(?!\s*\n)/g, ',\n  ');

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to format SQL: " + error.message);
  }
}
