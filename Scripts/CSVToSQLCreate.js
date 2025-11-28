/**
  {
    "api": 1,
    "name": "CSV to SQL CREATE TABLE",
    "description": "Generate SQL CREATE TABLE from CSV structure",
    "author": "Boop",
    "icon": "cylinder",
    "tags": "csv,sql,create,table,schema"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    if (lines.length < 1) {
      state.postError("Need at least a header row");
      return;
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const tableName = 'table_name';

    // Infer types from first data row
    const types = headers.map((header, i) => {
      if (lines.length > 1) {
        const sampleValue = lines[1].split(',')[i]?.trim();
        if (sampleValue && !isNaN(sampleValue)) {
          return sampleValue.includes('.') ? 'DECIMAL(10,2)' : 'INTEGER';
        }
      }
      return 'VARCHAR(255)';
    });

    let sql = `CREATE TABLE ${tableName} (\n`;
    sql += `  id INTEGER PRIMARY KEY AUTO_INCREMENT,\n`;

    for (let i = 0; i < headers.length; i++) {
      const comma = i < headers.length - 1 ? ',' : '';
      sql += `  ${headers[i]} ${types[i]}${comma}\n`;
    }

    sql += `);`;

    state.text = sql;
  } catch (error) {
    state.postError("Failed to generate SQL: " + error.message);
  }
}
