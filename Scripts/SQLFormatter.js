/**
  {
    "api": 1,
    "name": "SQL Formatter",
    "description": "Formats SQL with proper indentation and keywords",
    "author": "Boop",
    "icon": "square.stack.3d.up.fill",
    "tags": "sql,format,pretty,indent"
  }
**/

function main(state) {
  let sql = state.text;

  // Keywords that should start a new line
  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN',
    'RIGHT JOIN', 'OUTER JOIN', 'ON', 'GROUP BY', 'HAVING',
    'ORDER BY', 'UNION', 'UNION ALL', 'INSERT INTO', 'VALUES',
    'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE',
    'DROP TABLE', 'LIMIT', 'OFFSET'
  ];

  // Convert keywords to uppercase
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    sql = sql.replace(regex, keyword);
  });

  // Add newlines before major keywords
  sql = sql.replace(/\s+(SELECT|FROM|WHERE|JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN|GROUP BY|HAVING|ORDER BY|UNION|LIMIT)\s+/g, '\n$1 ');

  // Add newlines and indent for AND/OR in WHERE clauses
  sql = sql.replace(/\s+(AND|OR)\s+/g, '\n  $1 ');

  // Format column lists in SELECT
  sql = sql.replace(/SELECT\s+(.+?)\s+FROM/s, (match, cols) => {
    if (cols.includes(',')) {
      const formatted = cols.split(',').map(c => '\n  ' + c.trim()).join(',');
      return 'SELECT' + formatted + '\nFROM';
    }
    return match;
  });

  // Clean up extra whitespace
  sql = sql.replace(/\s+/g, ' ').trim();

  // Re-apply newlines (in case they were removed)
  keywords.forEach(keyword => {
    sql = sql.replace(new RegExp(`\\s+${keyword}\\s+`, 'g'), `\n${keyword} `);
  });

  state.text = sql;
}
