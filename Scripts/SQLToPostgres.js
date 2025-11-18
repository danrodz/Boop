/**
  {
    "api": 1,
    "name": "SQL to PostgreSQL Dialect",
    "description": "Convert MySQL SQL to PostgreSQL syntax",
    "author": "Boop",
    "icon": "cylinder.split.1x2",
    "tags": "sql,postgresql,postgres,mysql,convert"
  }
**/

function main(state) {
  try {
    let sql = state.text;

    // Convert AUTO_INCREMENT to SERIAL
    sql = sql.replace(/\bAUTO_INCREMENT\b/gi, 'SERIAL');

    // Convert backticks to double quotes
    sql = sql.replace(/`([^`]+)`/g, '"$1"');

    // Convert LIMIT offset, count to LIMIT count OFFSET offset
    sql = sql.replace(/LIMIT\s+(\d+)\s*,\s*(\d+)/gi, 'LIMIT $2 OFFSET $1');

    // Convert NOW() to CURRENT_TIMESTAMP
    sql = sql.replace(/\bNOW\(\)/gi, 'CURRENT_TIMESTAMP');

    // Convert UNSIGNED to CHECK constraint
    sql = sql.replace(/(\w+)\s+INT\s+UNSIGNED/gi, '$1 INT CHECK ($1 >= 0)');

    // Convert IF NOT EXISTS
    sql = sql.replace(/CREATE\s+TABLE\s+IF\s+NOT\s+EXISTS/gi, 'CREATE TABLE IF NOT EXISTS');

    // Convert ENGINE=InnoDB to nothing (PostgreSQL doesn't use this)
    sql = sql.replace(/\s*ENGINE\s*=\s*\w+/gi, '');

    // Convert DEFAULT CHARSET
    sql = sql.replace(/\s*DEFAULT\s+CHARSET\s*=\s*\w+/gi, '');

    state.text = sql;
    state.postInfo("Converted MySQL → PostgreSQL");
  } catch (error) {
    state.postError("Failed to convert: " + error.message);
  }
}
