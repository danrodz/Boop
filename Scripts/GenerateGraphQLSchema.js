/**
  {
    "api": 1,
    "name": "Generate GraphQL Schema",
    "description": "Generate GraphQL schema from type name",
    "author": "Boop",
    "icon": "square.grid.3x3",
    "tags": "graphql,schema,api,generate"
  }
**/

function main(state) {
  try {
    const typeName = state.text.trim() || 'User';

    let schema = `# GraphQL Schema\n\n`;
    schema += `type ${typeName} {\n`;
    schema += `  id: ID!\n`;
    schema += `  name: String!\n`;
    schema += `  email: String!\n`;
    schema += `  isActive: Boolean!\n`;
    schema += `  createdAt: DateTime!\n`;
    schema += `  updatedAt: DateTime!\n`;
    schema += `}\n\n`;

    schema += `input Create${typeName}Input {\n`;
    schema += `  name: String!\n`;
    schema += `  email: String!\n`;
    schema += `}\n\n`;

    schema += `input Update${typeName}Input {\n`;
    schema += `  name: String\n`;
    schema += `  email: String\n`;
    schema += `  isActive: Boolean\n`;
    schema += `}\n\n`;

    schema += `type Query {\n`;
    schema += `  ${typeName.toLowerCase()}(id: ID!): ${typeName}\n`;
    schema += `  ${typeName.toLowerCase()}s(limit: Int, offset: Int): [${typeName}!]!\n`;
    schema += `}\n\n`;

    schema += `type Mutation {\n`;
    schema += `  create${typeName}(input: Create${typeName}Input!): ${typeName}!\n`;
    schema += `  update${typeName}(id: ID!, input: Update${typeName}Input!): ${typeName}!\n`;
    schema += `  delete${typeName}(id: ID!): Boolean!\n`;
    schema += `}\n\n`;

    schema += `scalar DateTime\n`;

    state.text = schema;
  } catch (error) {
    state.postError("Failed to generate schema: " + error.message);
  }
}
