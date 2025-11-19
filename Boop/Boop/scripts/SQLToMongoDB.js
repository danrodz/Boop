/**
  {
    "api": 1,
    "name": "SQL to MongoDB",
    "description": "Convert SQL query to MongoDB query",
    "author": "Boop",
    "icon": "leaf",
    "tags": "sql,mongodb,nosql,convert,database"
  }
**/

function main(state) {
  try {
    const sql = state.text.trim();

    // Parse simple SELECT statement
    const selectMatch = sql.match(/SELECT\s+(.*?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER BY\s+(.+?))?(?:\s+LIMIT\s+(\d+))?;?$/is);

    if (!selectMatch) {
      state.postError("Could not parse SQL. Use simple SELECT format.");
      return;
    }

    const columns = selectMatch[1].trim();
    const collection = selectMatch[2];
    const where = selectMatch[3];
    const orderBy = selectMatch[4];
    const limit = selectMatch[5];

    let mongoQuery = `db.${collection}.find(`;

    // Build filter
    if (where) {
      // Simple conversion of WHERE clause
      const filter = where
        .replace(/\s+AND\s+/gi, ', ')
        .replace(/\s+OR\s+/gi, ' $or: ')
        .replace(/=/g, ':')
        .replace(/(\w+):\s*'([^']+)'/g, '"$1": "$2"')
        .replace(/(\w+):\s*(\d+)/g, '"$1": $2');

      mongoQuery += `{ ${filter} }`;
    } else {
      mongoQuery += '{}';
    }

    // Build projection
    if (columns !== '*') {
      const fields = columns.split(',').map(c => c.trim());
      const projection = fields.map(f => `"${f}": 1`).join(', ');
      mongoQuery += `, { ${projection} }`;
    }

    mongoQuery += ')';

    // Add sort
    if (orderBy) {
      const sortFields = orderBy.split(',').map(f => {
        const parts = f.trim().split(/\s+/);
        const field = parts[0];
        const direction = parts[1]?.toUpperCase() === 'DESC' ? -1 : 1;
        return `"${field}": ${direction}`;
      });
      mongoQuery += `.sort({ ${sortFields.join(', ')} })`;
    }

    // Add limit
    if (limit) {
      mongoQuery += `.limit(${limit})`;
    }

    mongoQuery += ';';

    state.text = mongoQuery;
    state.postInfo("Converted to MongoDB query");
  } catch (error) {
    state.postError("Error converting to MongoDB: " + error.message);
  }
}
