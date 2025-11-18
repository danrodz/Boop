/**
  {
    "api": 1,
    "name": "SQL Index Suggestion",
    "description": "Suggest indexes based on SQL query",
    "author": "Boop",
    "icon": "list.bullet.indent",
    "tags": "sql,index,performance,optimization"
  }
**/

function main(state) {
  try {
    const sql = state.text.trim();

    const suggestions = [];
    const fromMatch = sql.match(/FROM\s+(\w+)/i);
    const tableName = fromMatch ? fromMatch[1] : 'table_name';

    // WHERE clause columns
    const whereMatch = sql.match(/WHERE\s+(.+?)(?:ORDER|GROUP|LIMIT|$)/i);
    if (whereMatch) {
      const whereColumns = [];
      const columnMatches = whereMatch[1].matchAll(/(\w+)\s*[=<>]/g);
      for (let match of columnMatches) {
        whereColumns.push(match[1]);
      }

      if (whereColumns.length > 0) {
        suggestions.push({
          type: 'WHERE clause index',
          sql: `CREATE INDEX idx_${tableName}_${whereColumns.join('_')} ON ${tableName}(${whereColumns.join(', ')});`,
          reason: 'Speed up WHERE clause filtering'
        });
      }
    }

    // JOIN columns
    const joinMatches = sql.matchAll(/JOIN\s+\w+\s+ON\s+\w+\.(\w+)\s*=\s*\w+\.(\w+)/gi);
    for (let match of joinMatches) {
      suggestions.push({
        type: 'JOIN index',
        sql: `CREATE INDEX idx_${tableName}_${match[1]} ON ${tableName}(${match[1]});`,
        reason: 'Speed up JOIN operations'
      });
    }

    // ORDER BY columns
    const orderMatch = sql.match(/ORDER\s+BY\s+(.+?)(?:LIMIT|$)/i);
    if (orderMatch) {
      const orderColumns = orderMatch[1].split(',').map(c => c.trim().split(' ')[0]);
      suggestions.push({
        type: 'ORDER BY index',
        sql: `CREATE INDEX idx_${tableName}_${orderColumns.join('_')}_sort ON ${tableName}(${orderColumns.join(', ')});`,
        reason: 'Avoid filesort, speed up ORDER BY'
      });
    }

    // GROUP BY columns
    const groupMatch = sql.match(/GROUP\s+BY\s+(.+?)(?:ORDER|HAVING|LIMIT|$)/i);
    if (groupMatch) {
      const groupColumns = groupMatch[1].split(',').map(c => c.trim());
      suggestions.push({
        type: 'GROUP BY index',
        sql: `CREATE INDEX idx_${tableName}_${groupColumns.join('_')}_group ON ${tableName}(${groupColumns.join(', ')});`,
        reason: 'Speed up GROUP BY aggregation'
      });
    }

    if (suggestions.length === 0) {
      state.text = 'No specific index suggestions for this query.\n\nConsider adding indexes on:\n- WHERE clause columns\n- JOIN columns\n- ORDER BY columns';
      return;
    }

    let result = '=== INDEX SUGGESTIONS ===\n\n';
    for (let i = 0; i < suggestions.length; i++) {
      const s = suggestions[i];
      result += `${i + 1}. ${s.type}\n`;
      result += `   ${s.sql}\n`;
      result += `   → ${s.reason}\n\n`;
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to generate suggestions: " + error.message);
  }
}
