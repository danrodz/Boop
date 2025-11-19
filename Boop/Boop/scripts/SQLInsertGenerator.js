/**
  {
    "api": 1,
    "name": "SQL INSERT Generator",
    "description": "Generate SQL INSERT from JSON array or CSV",
    "author": "Boop",
    "icon": "plus.square.on.square",
    "tags": "sql,insert,generate,database,csv,json"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    let data;
    let tableName = 'table_name';

    // Try to parse as JSON
    try {
      data = JSON.parse(input);
      if (!Array.isArray(data)) {
        data = [data];
      }
    } catch {
      // Try to parse as CSV
      const lines = input.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      data = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const values = lines[i].split(',').map(v => v.trim());
        const row = {};
        headers.forEach((h, idx) => {
          row[h] = values[idx];
        });
        data.push(row);
      }
    }

    if (!data || data.length === 0) {
      state.postError("No data found. Provide JSON array or CSV.");
      return;
    }

    const columns = Object.keys(data[0]);
    const inserts = [];

    for (const row of data) {
      const values = columns.map(col => {
        const val = row[col];
        if (val === null || val === undefined) return 'NULL';
        if (typeof val === 'number') return val;
        return `'${String(val).replace(/'/g, "''")}'`;
      });

      inserts.push(`INSERT INTO ${tableName} (${columns.join(', ')})\nVALUES (${values.join(', ')});`);
    }

    state.text = inserts.join('\n\n');
    state.postInfo(`Generated ${inserts.length} INSERT statement(s)`);
  } catch (error) {
    state.postError("Error generating INSERT: " + error.message);
  }
}
