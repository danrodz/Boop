/**
  {
    "api": 1,
    "name": "JSON to Zod Schema",
    "description": "Convert JSON object to Zod validation schema",
    "author": "Boop",
    "icon": "code",
    "tags": "json,zod,schema,validation,typescript"
  }
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);

    function getZodType(value) {
      if (value === null) return 'z.null()';
      if (typeof value === 'string') return 'z.string()';
      if (typeof value === 'number') return 'z.number()';
      if (typeof value === 'boolean') return 'z.boolean()';
      if (Array.isArray(value)) {
        return value.length > 0 ? `z.array(${getZodType(value[0])})` : 'z.array(z.any())';
      }
      if (typeof value === 'object') {
        let nested = 'z.object({\n';
        for (const [k, v] of Object.entries(value)) {
          nested += `    ${k}: ${getZodType(v)},\n`;
        }
        nested += '  })';
        return nested;
      }
      return 'z.any()';
    }

    let schema = 'const schema = z.object({\n';
    for (const [key, value] of Object.entries(obj)) {
      schema += `  ${key}: ${getZodType(value)},\n`;
    }
    schema += '});';

    state.text = schema;
    state.postInfo("Converted to Zod schema");
  } catch (error) {
    state.postError(`Invalid JSON: ${error.message}`);
  }
}
