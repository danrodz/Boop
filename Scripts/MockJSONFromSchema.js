/**
  {
    "api": 1,
    "name": "Mock Data from JSON Schema",
    "description": "Generate mock JSON data from JSON Schema",
    "author": "Boop",
    "icon": "square.stack.3d.up",
    "tags": "json,schema,mock,generate,fake"
  }
**/

function main(state) {
  try {
    const schema = JSON.parse(state.text);

    function generateFromSchema(schema) {
      if (schema.type === 'object') {
        const obj = {};
        for (let [key, propSchema] of Object.entries(schema.properties || {})) {
          obj[key] = generateFromSchema(propSchema);
        }
        return obj;
      } else if (schema.type === 'array') {
        const item = generateFromSchema(schema.items || { type: 'string' });
        return [item, item]; // Generate 2 items
      } else if (schema.type === 'string') {
        if (schema.format === 'email') return 'user@example.com';
        if (schema.format === 'date') return '2024-01-01';
        if (schema.format === 'uuid') return '123e4567-e89b-12d3-a456-426614174000';
        if (schema.enum) return schema.enum[0];
        return 'sample string';
      } else if (schema.type === 'number' || schema.type === 'integer') {
        return schema.type === 'integer' ? 42 : 3.14;
      } else if (schema.type === 'boolean') {
        return true;
      } else if (schema.type === 'null') {
        return null;
      }
      return null;
    }

    const mockData = generateFromSchema(schema);
    state.text = JSON.stringify(mockData, null, 2);
  } catch (error) {
    state.postError("Failed to generate mock data: " + error.message);
  }
}
