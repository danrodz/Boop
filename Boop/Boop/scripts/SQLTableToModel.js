/**
  {
    "api": 1,
    "name": "SQL Table to Model",
    "description": "Convert SQL CREATE TABLE to TypeScript interface",
    "author": "Boop",
    "icon": "tablecells",
    "tags": "sql,typescript,model,interface,orm"
  }
**/

function main(state) {
  try {
    const sql = state.text;

    // Extract table name
    const tableMatch = sql.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?(\w+)`?/i);
    if (!tableMatch) {
      state.postError("Could not find CREATE TABLE statement");
      return;
    }

    const tableName = tableMatch[1];
    const interfaceName = tableName.charAt(0).toUpperCase() + tableName.slice(1);

    // Extract columns
    const columnPattern = /`?(\w+)`?\s+([\w()]+)(?:\s+(NOT\s+NULL|NULL|PRIMARY\s+KEY|AUTO_INCREMENT|DEFAULT\s+\S+))*[,\n]/gi;
    const columns = [];
    let match;

    while ((match = columnPattern.exec(sql)) !== null) {
      const colName = match[1];
      const colType = match[2].toLowerCase();

      let tsType = 'any';
      if (colType.includes('int') || colType.includes('decimal') || colType.includes('float') || colType.includes('double')) {
        tsType = 'number';
      } else if (colType.includes('varchar') || colType.includes('text') || colType.includes('char')) {
        tsType = 'string';
      } else if (colType.includes('bool')) {
        tsType = 'boolean';
      } else if (colType.includes('date') || colType.includes('time')) {
        tsType = 'Date';
      }

      const nullable = match[3] && match[3].includes('NOT NULL') ? '' : ' | null';
      columns.push(`  ${colName}: ${tsType}${nullable};`);
    }

    const result = `interface ${interfaceName} {\n${columns.join('\n')}\n}`;
    state.text = result;
  } catch (error) {
    state.postError("Error converting SQL to model: " + error.message);
  }
}
