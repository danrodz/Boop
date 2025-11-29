/**
  {
    "api": 1,
    "name": "JSON Schema from Example",
    "description": "Generates JSON Schema from example JSON",
    "author": "Boop",
    "icon": "doc.text.fill",
    "tags": "json,schema,generate,validation"
  }
**/

function main(state) {
  try {
    const example = JSON.parse(state.text);

    function getType(value) {
      if (value === null) return { type: "null" };
      if (Array.isArray(value)) {
        if (value.length === 0) return { type: "array", items: {} };
        return { type: "array", items: getType(value[0]) };
      }
      if (typeof value === "object") {
        return generateSchema(value);
      }
      if (typeof value === "number") {
        return Number.isInteger(value) ? { type: "integer" } : { type: "number" };
      }
      if (typeof value === "boolean") return { type: "boolean" };
      return { type: "string" };
    }

    function generateSchema(obj) {
      const schema = {
        type: "object",
        properties: {},
        required: []
      };

      for (const key in obj) {
        schema.properties[key] = getType(obj[key]);
        schema.required.push(key);
      }

      return schema;
    }

    const schema = {
      "$schema": "http://json-schema.org/draft-07/schema#",
      ...generateSchema(example)
    };

    state.text = JSON.stringify(schema, null, 2);
  } catch (error) {
    state.postError("Failed to generate schema: " + error.message);
  }
}
