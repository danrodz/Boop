/**
  {
    "api": 1,
    "name": "SQL Index Suggester",
    "description": "Suggest indexes based on query patterns",
    "author": "Boop",
    "icon": "bolt.circle",
    "tags": "sql,index,performance,optimize,database"
  }
**/

function main(state) {
  try {
    const sql = state.text.trim();
    const suggestions = [];

    // Extract table name
    const tableMatch = sql.match(/FROM\s+(\w+)/i);
    const table = tableMatch ? tableMatch[1] : 'table_name';

    // Find WHERE clause columns
    const whereMatch = sql.match(/WHERE\s+(.+?)(?:ORDER BY|GROUP BY|LIMIT|$)/is);
    if (whereMatch) {
      const whereClause = whereMatch[1];
      const columns = whereClause.match(/\b(\w+)\s*[=<>]/g);

      if (columns) {
        const uniqueCols = [...new Set(columns.map(c => c.replace(/\s*[=<>]/, '')))];

        if (uniqueCols.length === 1) {
          suggestions.push(`CREATE INDEX idx_${table}_${uniqueCols[0]} ON ${table}(${uniqueCols[0]});`);
        } else if (uniqueCols.length > 1) {
          // Composite index
          suggestions.push(`CREATE INDEX idx_${table}_composite ON ${table}(${uniqueCols.join(', ')});`);

          // Individual indexes
          uniqueCols.forEach(col => {
            suggestions.push(`-- Alternative: CREATE INDEX idx_${table}_${col} ON ${table}(${col});`);
          });
        }
      }
    }

    // Find JOIN columns
    const joinMatches = sql.matchAll(/JOIN\s+\w+\s+ON\s+\w+\.(\w+)\s*=\s*\w+\.(\w+)/gi);
    for (const match of joinMatches) {
      suggestions.push(`-- For JOIN: CREATE INDEX idx_${table}_${match[1]} ON ${table}(${match[1]});`);
    }

    // Find ORDER BY columns
    const orderMatch = sql.match(/ORDER BY\s+(.+?)(?:LIMIT|$)/is);
    if (orderMatch) {
      const orderCols = orderMatch[1].split(',').map(c => c.trim().split(/\s+/)[0]);
      suggestions.push(`-- For ORDER BY: CREATE INDEX idx_${table}_sort ON ${table}(${orderCols.join(', ')});`);
    }

    if (suggestions.length === 0) {
      state.text = 'No index suggestions. Query appears to be simple or already optimized.';
      return;
    }

    const result = [
      'Suggested Indexes:',
      '',
      ...suggestions,
      '',
      'Note: Test performance before adding indexes.',
      'Indexes improve read performance but slow down writes.'
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error suggesting indexes: " + error.message);
  }
}
