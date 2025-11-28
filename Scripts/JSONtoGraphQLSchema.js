/**
  {
    "api": 1,
    "name": "JSON to GraphQL Schema",
    "description": "Convert JSON object to GraphQL type definition",
    "author": "Boop",
    "icon": "code",
    "tags": "json,graphql,schema,convert,api"
  }
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);
    const typeName = "MyType";

    function getGraphQLType(value) {
      if (value === null) return 'String';
      if (typeof value === 'string') return 'String';
      if (typeof value === 'number') return Number.isInteger(value) ? 'Int' : 'Float';
      if (typeof value === 'boolean') return 'Boolean';
      if (Array.isArray(value)) {
        return value.length > 0 ? `[${getGraphQLType(value[0])}]` : '[String]';
      }
      if (typeof value === 'object') return 'JSON';
      return 'String';
    }

    let schema = `type ${typeName} {\n`;
    for (const [key, value] of Object.entries(obj)) {
      schema += `  ${key}: ${getGraphQLType(value)}\n`;
    }
    schema += `}`;

    state.text = schema;
    state.postInfo("Converted to GraphQL schema");
  } catch (error) {
    state.postError(`Invalid JSON: ${error.message}`);
  }
}
