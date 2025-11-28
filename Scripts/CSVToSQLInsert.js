/**
  {
    "api": 1,
    "name": "CSV to SQL INSERT",
    "description": "Generate SQL INSERT statements from CSV data",
    "author": "Boop",
    "icon": "cylinder",
    "tags": "csv,sql,insert,generate"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    if (lines.length < 2) {
      state.postError("Need at least header and one data row");
      return;
    }

    // Parse header
    const headers = lines[0].split(',').map(h => h.trim());
    const tableName = 'table_name';

    let sql = `-- Generated SQL INSERT statements\n\n`;

    // Generate INSERT for each row
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => {
        v = v.trim();
        // Quote non-numeric values
        if (isNaN(v) || v === '') {
          return `'${v.replace(/'/g, "''")}'`;
        }
        return v;
      });

      sql += `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${values.join(', ')});\n`;
    }

    state.text = sql;
  } catch (error) {
    state.postError("Failed to generate SQL: " + error.message);
  }
}
