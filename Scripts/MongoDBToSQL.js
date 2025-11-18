/**
  {
    "api": 1,
    "name": "MongoDB to SQL Query",
    "description": "Convert MongoDB query to SQL",
    "author": "Boop",
    "icon": "cylinder",
    "tags": "mongodb,sql,convert,query"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    // Extract collection name and query
    const collMatch = input.match(/db\.(\w+)\.find\((.*?)\)/s);

    if (!collMatch) {
      state.postError("Format: db.collection.find({query})");
      return;
    }

    const collection = collMatch[1];
    const queryStr = collMatch[2].trim();

    let sql = `SELECT * FROM ${collection}`;

    if (queryStr && queryStr !== '{}' && queryStr !== '') {
      try {
        const query = JSON.parse(queryStr);
        const conditions = [];

        for (let [key, value] of Object.entries(query)) {
          if (typeof value === 'string') {
            conditions.push(`${key} = '${value}'`);
          } else if (typeof value === 'number') {
            conditions.push(`${key} = ${value}`);
          } else if (typeof value === 'object' && value.$gt !== undefined) {
            conditions.push(`${key} > ${value.$gt}`);
          } else if (typeof value === 'object' && value.$lt !== undefined) {
            conditions.push(`${key} < ${value.$lt}`);
          } else if (typeof value === 'object' && value.$regex !== undefined) {
            conditions.push(`${key} LIKE '%${value.$regex}%'`);
          }
        }

        if (conditions.length > 0) {
          sql += '\nWHERE ' + conditions.join(' AND ');
        }
      } catch (e) {
        // If parse fails, just show the base query
      }
    }

    sql += ';';

    state.text = sql;
  } catch (error) {
    state.postError("Failed to convert: " + error.message);
  }
}
