/**
  {
    "api": 1,
    "name": "JSON to GraphQL Type",
    "description": "Generates GraphQL type definition from JSON",
    "author": "Boop",
    "icon": "arrow.right",
    "tags": "json,graphql,type,schema,convert"
  }
**/

function jsonToGraphQL(obj, typeName = 'MyType') {
  function getType(val) {
    if (val === null) return 'String';
    if (typeof val === 'boolean') return 'Boolean';
    if (typeof val === 'number') return Number.isInteger(val) ? 'Int' : 'Float';
    if (typeof val === 'string') return 'String';
    if (Array.isArray(val)) return '[' + getType(val[0]) + ']';
    return 'JSON';
  }

  let schema = `type ${typeName} {\n`;
  for (let key in obj) {
    schema += `  ${key}: ${getType(obj[key])}\n`;
  }
  schema += '}';

  return schema;
}

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = jsonToGraphQL(json);
  } catch (error) {
    state.postError("Failed to convert to GraphQL: " + error.message);
  }
}
