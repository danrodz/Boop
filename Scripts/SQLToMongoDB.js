/**
  {
    "api": 1,
    "name": "SQL to MongoDB Query",
    "description": "Convert simple SQL SELECT to MongoDB query",
    "author": "Boop",
    "icon": "cylinder",
    "tags": "sql,mongodb,convert,query"
  }
**/

function main(state) {
  try {
    const sql = state.text.trim().toUpperCase();

    // Parse SELECT columns
    const selectMatch = sql.match(/SELECT\s+(.+?)\s+FROM/i);
    const fromMatch = sql.match(/FROM\s+(\w+)/i);
    const whereMatch = sql.match(/WHERE\s+(.+?)(?:ORDER|LIMIT|$)/i);

    if (!fromMatch) {
      state.postError("Could not parse SQL query");
      return;
    }

    const collection = fromMatch[1].toLowerCase();
    let query = {};
    let projection = {};

    // Parse WHERE clause
    if (whereMatch) {
      const conditions = whereMatch[1].trim();
      // Simple equality: WHERE field = 'value'
      const eqMatch = conditions.match(/(\w+)\s*=\s*'([^']+)'/i);
      if (eqMatch) {
        query[eqMatch[1].toLowerCase()] = eqMatch[2];
      }
    }

    // Parse SELECT columns
    if (selectMatch) {
      const columns = selectMatch[1].trim();
      if (columns !== '*') {
        const fields = columns.split(',').map(f => f.trim().toLowerCase());
        for (let field of fields) {
          projection[field] = 1;
        }
      }
    }

    let result = `db.${collection}.find(\n`;
    result += `  ${JSON.stringify(query, null, 2).replace(/\n/g, '\n  ')}`;

    if (Object.keys(projection).length > 0) {
      result += `,\n  ${JSON.stringify(projection, null, 2).replace(/\n/g, '\n  ')}`;
    }

    result += '\n)';

    state.text = result;
  } catch (error) {
    state.postError("Failed to convert to MongoDB: " + error.message);
  }
}
