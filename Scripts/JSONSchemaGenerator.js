/**
  {
    "api": 1,
    "name": "Generate JSON Schema",
    "description": "Generate JSON Schema from sample JSON data",
    "author": "Boop",
    "icon": "doc.text.magnifyingglass",
    "tags": "json,schema,generate,validation"
  }
**/

function main(state) {
  try {
    const data = JSON.parse(state.text);

    function getType(value) {
      if (value === null) return 'null';
      if (Array.isArray(value)) return 'array';
      return typeof value;
    }

    function generateSchema(obj) {
      const type = getType(obj);

      if (type === 'object') {
        const schema = {
          type: 'object',
          properties: {},
          required: []
        };

        for (let [key, value] of Object.entries(obj)) {
          schema.properties[key] = generateSchema(value);
          schema.required.push(key);
        }

        return schema;
      } else if (type === 'array') {
        return {
          type: 'array',
          items: obj.length > 0 ? generateSchema(obj[0]) : {}
        };
      } else {
        return { type };
      }
    }

    const schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      ...generateSchema(data)
    };

    state.text = JSON.stringify(schema, null, 2);
  } catch (error) {
    state.postError("Failed to generate schema: " + error.message);
  }
}
