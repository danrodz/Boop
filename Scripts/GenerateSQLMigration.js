/**
  {
    "api": 1,
    "name": "Generate SQL Migration",
    "description": "Generate up/down migration from table definition",
    "author": "Boop",
    "icon": "arrow.up.arrow.down",
    "tags": "sql,migration,database,schema"
  }
**/

function main(state) {
  try {
    const tableName = state.text.trim().split(/\s+/)[0] || 'users';

    const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
    const migrationName = `${timestamp}_create_${tableName}_table`;

    let migration = `-- Migration: ${migrationName}\n\n`;
    migration += `-- Up Migration\n`;
    migration += `CREATE TABLE ${tableName} (\n`;
    migration += `  id BIGSERIAL PRIMARY KEY,\n`;
    migration += `  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n`;
    migration += `  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n`;
    migration += `);\n\n`;
    migration += `-- Create index on created_at\n`;
    migration += `CREATE INDEX idx_${tableName}_created_at ON ${tableName}(created_at);\n\n`;
    migration += `-- Down Migration\n`;
    migration += `DROP TABLE IF EXISTS ${tableName} CASCADE;\n`;

    state.text = migration;
  } catch (error) {
    state.postError("Failed to generate migration: " + error.message);
  }
}
