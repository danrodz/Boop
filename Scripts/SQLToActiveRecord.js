/**
  {
    "api": 1,
    "name": "SQL to Rails ActiveRecord",
    "description": "Convert SQL query to Rails ActiveRecord syntax",
    "author": "Boop",
    "icon": "cube",
    "tags": "sql,rails,activerecord,ruby,convert"
  }
**/

function main(state) {
  try {
    const sql = state.text.trim();

    // Parse simple SELECT queries
    const selectMatch = sql.match(/SELECT\s+(.+?)\s+FROM\s+(\w+)/i);
    const whereMatch = sql.match(/WHERE\s+(.+?)(?:ORDER|LIMIT|$)/i);
    const orderMatch = sql.match(/ORDER\s+BY\s+(.+?)(?:LIMIT|$)/i);
    const limitMatch = sql.match(/LIMIT\s+(\d+)/i);

    if (!selectMatch) {
      state.postError("Could not parse SQL query");
      return;
    }

    const table = selectMatch[2];
    const modelName = table.charAt(0).toUpperCase() + table.slice(1).replace(/s$/, '');

    let ar = `${modelName}`;

    // WHERE clause
    if (whereMatch) {
      const conditions = whereMatch[1].trim();
      // Simple equality
      const eqMatch = conditions.match(/(\w+)\s*=\s*'([^']+)'/i);
      if (eqMatch) {
        ar += `.where(${eqMatch[1]}: '${eqMatch[2]}')`;
      }
    } else {
      ar += `.all`;
    }

    // ORDER BY
    if (orderMatch) {
      const orderClause = orderMatch[1].trim();
      ar += `.order('${orderClause}')`;
    }

    // LIMIT
    if (limitMatch) {
      ar += `.limit(${limitMatch[1]})`;
    }

    // Select specific columns
    const columns = selectMatch[1].trim();
    if (columns !== '*') {
      ar += `.select(${columns.split(',').map(c => `'${c.trim()}'`).join(', ')})`;
    }

    state.text = ar;
  } catch (error) {
    state.postError("Failed to convert: " + error.message);
  }
}
