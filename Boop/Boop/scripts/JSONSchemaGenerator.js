/**
  {
    "api": 1,
    "name": "JSON Schema Generator",
    "description": "Generate JSON Schema from sample JSON",
    "author": "Boop",
    "icon": "doc.badge.gearshape",
    "tags": "json,schema,validation,generate"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function getType(value) {
      if (value === null) return 'null';
      if (Array.isArray(value)) return 'array';
      return typeof value;
    }

    function generateSchema(obj) {
      const schema = {
        type: getType(obj)
      };

      if (Array.isArray(obj)) {
        if (obj.length > 0) {
          schema.items = generateSchema(obj[0]);
        }
      } else if (typeof obj === 'object' && obj !== null) {
        schema.properties = {};
        schema.required = [];

        for (const [key, value] of Object.entries(obj)) {
          schema.properties[key] = generateSchema(value);
          schema.required.push(key);
        }
      }

      return schema;
    }

    const schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      ...generateSchema(json)
    };

    state.text = JSON.stringify(schema, null, 2);
  } catch (error) {
    state.postError("Error generating JSON Schema: " + error.message);
  }
}
