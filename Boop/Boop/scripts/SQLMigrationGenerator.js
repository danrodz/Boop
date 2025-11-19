/**
  {
    "api": 1,
    "name": "SQL Migration Generator",
    "description": "Generate ALTER TABLE migration from schema diff",
    "author": "Boop",
    "icon": "arrow.right.circle",
    "tags": "sql,migration,alter,database,schema"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    if (lines.length < 2) {
      state.text = 'Format:\ntable_name\nADD column_name TYPE\nDROP column_name\nMODIFY column_name NEW_TYPE';
      return;
    }

    const tableName = lines[0].trim();
    const migrations = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const addMatch = line.match(/ADD\s+(\w+)\s+(.+)/i);
      const dropMatch = line.match(/DROP\s+(\w+)/i);
      const modifyMatch = line.match(/MODIFY\s+(\w+)\s+(.+)/i);

      if (addMatch) {
        migrations.push(`ALTER TABLE ${tableName}\nADD COLUMN ${addMatch[1]} ${addMatch[2]};`);
      } else if (dropMatch) {
        migrations.push(`ALTER TABLE ${tableName}\nDROP COLUMN ${dropMatch[1]};`);
      } else if (modifyMatch) {
        migrations.push(`ALTER TABLE ${tableName}\nMODIFY COLUMN ${modifyMatch[1]} ${modifyMatch[2]};`);
      }
    }

    if (migrations.length === 0) {
      state.postError("No valid migration commands found");
      return;
    }

    const result = [
      '-- Migration Script',
      `-- Table: ${tableName}`,
      `-- Generated: ${new Date().toISOString()}`,
      '',
      ...migrations
    ].join('\n');

    state.text = result;
    state.postInfo(`Generated ${migrations.length} migration(s)`);
  } catch (error) {
    state.postError("Error generating migration: " + error.message);
  }
}
