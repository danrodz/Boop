/**
  {
    "api": 1,
    "name": "SQL to GraphQL Schema",
    "description": "Convert SQL CREATE TABLE to GraphQL type definitions",
    "author": "Boop",
    "icon": "network",
    "tags": "sql,graphql,schema,convert,api"
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
    const typeName = tableName.charAt(0).toUpperCase() + tableName.slice(1);

    // Extract columns
    const columnPattern = /`?(\w+)`?\s+([\w()]+)(?:\s+(NOT\s+NULL|NULL|PRIMARY\s+KEY|AUTO_INCREMENT|DEFAULT\s+\S+))*[,\n]/gi;
    const fields = [];
    let match;

    while ((match = columnPattern.exec(sql)) !== null) {
      const colName = match[1];
      const colType = match[2].toLowerCase();
      const constraints = match[3] || '';

      let gqlType = 'String';

      if (colType.includes('int') || colType.includes('decimal') || colType.includes('float') || colType.includes('double')) {
        gqlType = colType.includes('decimal') || colType.includes('float') || colType.includes('double') ? 'Float' : 'Int';
      } else if (colType.includes('bool')) {
        gqlType = 'Boolean';
      } else if (colType.includes('date') || colType.includes('time')) {
        gqlType = 'DateTime';
      }

      const required = constraints.includes('NOT NULL') ? '!' : '';
      fields.push(`  ${colName}: ${gqlType}${required}`);
    }

    const result = `type ${typeName} {
${fields.join('\n')}
}

type Query {
  ${tableName}(id: ID!): ${typeName}
  ${tableName}s(limit: Int, offset: Int): [${typeName}!]!
}

type Mutation {
  create${typeName}(input: Create${typeName}Input!): ${typeName}!
  update${typeName}(id: ID!, input: Update${typeName}Input!): ${typeName}!
  delete${typeName}(id: ID!): Boolean!
}`;

    state.text = result;
  } catch (error) {
    state.postError("Error converting to GraphQL: " + error.message);
  }
}
