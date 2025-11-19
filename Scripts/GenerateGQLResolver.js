/**
  {
    "api": 1,
    "name": "Generate GraphQL Resolver",
    "description": "Generate GraphQL resolver template",
    "author": "Boop",
    "icon": "square.grid.3x3",
    "tags": "graphql,resolver,generate"
  }
**/
function main(state) {
  const type = state.text.trim() || 'User';
  const lower = type.toLowerCase();
  
  let code = `const resolvers = {\n`;
  code += `  Query: {\n`;
  code += `    ${lower}: async (_, { id }) => {\n`;
  code += `      return await ${type}.findById(id);\n`;
  code += `    },\n`;
  code += `    ${lower}s: async () => {\n`;
  code += `      return await ${type}.find();\n`;
  code += `    }\n  },\n\n`;
  code += `  Mutation: {\n`;
  code += `    create${type}: async (_, { input }) => {\n`;
  code += `      return await ${type}.create(input);\n`;
  code += `    },\n`;
  code += `    update${type}: async (_, { id, input }) => {\n`;
  code += `      return await ${type}.findByIdAndUpdate(id, input, { new: true });\n`;
  code += `    }\n  }\n};`;
  
  state.text = code;
}