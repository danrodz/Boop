/**
  {
    "api": 1,
    "name": "Database Schema Diff",
    "description": "Compare two CREATE TABLE statements (separate with ---)",
    "author": "Boop",
    "icon": "rectangle.split.2x1",
    "tags": "database,schema,diff,compare,migration"
  }
**/

function main(state) {
  try {
    const parts = state.text.split('---');

    if (parts.length < 2) {
      state.postError("Separate two CREATE TABLE statements with ---");
      return;
    }

    function parseTable(sql) {
      const columns = {};
      const columnPattern = /`?(\w+)`?\s+([\w()]+)(?:\s+[^,\n]*)?[,\n]/gi;
      let match;

      while ((match = columnPattern.exec(sql)) !== null) {
        columns[match[1]] = match[2];
      }

      return columns;
    }

    const schema1 = parseTable(parts[0]);
    const schema2 = parseTable(parts[1]);

    const added = [];
    const removed = [];
    const modified = [];

    // Find added and modified
    for (const [col, type] of Object.entries(schema2)) {
      if (!schema1[col]) {
        added.push(`+ ${col} ${type}`);
      } else if (schema1[col] !== type) {
        modified.push(`~ ${col}: ${schema1[col]} → ${type}`);
      }
    }

    // Find removed
    for (const col of Object.keys(schema1)) {
      if (!schema2[col]) {
        removed.push(`- ${col} ${schema1[col]}`);
      }
    }

    const result = ['Schema Differences:', ''];

    if (added.length > 0) {
      result.push('Added Columns:');
      result.push(...added);
      result.push('');
    }

    if (removed.length > 0) {
      result.push('Removed Columns:');
      result.push(...removed);
      result.push('');
    }

    if (modified.length > 0) {
      result.push('Modified Columns:');
      result.push(...modified);
      result.push('');
    }

    if (added.length === 0 && removed.length === 0 && modified.length === 0) {
      result.push('No differences found');
    }

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error comparing schemas: " + error.message);
  }
}
