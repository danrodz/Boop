/**
  {
    "api": 1,
    "name": "SQL Query Builder",
    "description": "Build SQL queries from simple input (format: table, columns, condition)",
    "author": "Boop",
    "icon": "cylinder",
    "tags": "sql,query,builder,database,select"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    if (lines.length < 2) {
      state.text = 'Format:\ntable_name\ncolumn1, column2\nwhere_condition (optional)';
      return;
    }

    const table = lines[0].trim();
    const columns = lines[1].trim() || '*';
    const where = lines[2]?.trim();
    const orderBy = lines[3]?.trim();
    const limit = lines[4]?.trim();

    let query = `SELECT ${columns}\nFROM ${table}`;

    if (where) {
      query += `\nWHERE ${where}`;
    }

    if (orderBy) {
      query += `\nORDER BY ${orderBy}`;
    }

    if (limit) {
      query += `\nLIMIT ${limit}`;
    }

    query += ';';

    state.text = query;
    state.postInfo("SQL query generated");
  } catch (error) {
    state.postError("Error building query: " + error.message);
  }
}
