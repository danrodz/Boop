/**
{
  "api": 1,
  "name": "Generate SQL INSERT Statements",
  "description": "Converts CSV to SQL INSERT statements",
  "author": "Boop",
  "icon": "db",
  "tags": "sql,insert,csv,database"
}
**/

function main(state) {
  const lines = state.text.split('\n').filter(l => l.trim());
  if (lines.length < 2) {
    state.postError("Need at least header and one data row");
    return;
  }

  const headers = lines[0].split(',').map(h => h.trim());
  const tableName = "table_name";
  const inserts = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => `'${v.trim()}'`).join(', ');
    inserts.push(`INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${values});`);
  }

  state.text = inserts.join('\n');
}
