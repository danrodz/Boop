/**
  {
    "api": 1,
    "name": "Generate JSON Schema",
    "description": "Generates JSON Schema from example JSON",
    "author": "Boop",
    "icon": "doc.text.magnifyingglass",
    "tags": "json,schema,generate,validate,type"
  }
**/

function main(state) {
  let obj;
  try {
    obj = JSON.parse(state.text);
  } catch (e) {
    if (typeof state.postError === 'function') {
      state.postError("Invalid JSON: " + e.message);
    }
    return;
  }

  function generateSchema(value) {
    if (value === null) {
      return { type: "null" };
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return { type: "array", items: {} };
      }
      return {
        type: "array",
        items: generateSchema(value[0])
      };
    }

    const type = typeof value;

    if (type === "object") {
      const properties = {};
      const required = [];

      for (const key in value) {
        properties[key] = generateSchema(value[key]);
        required.push(key);
      }

      return {
        type: "object",
        properties,
        required
      };
    }

    if (type === "number") {
      return Number.isInteger(value) ? { type: "integer" } : { type: "number" };
    }

    if (type === "string") {
      const schema = { type: "string" };

      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        schema.format = "date-time";
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        schema.format = "date";
      } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        schema.format = "email";
      } else if (/^https?:\/\//.test(value)) {
        schema.format = "uri";
      } else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
        schema.format = "uuid";
      }

      return schema;
    }

    if (type === "boolean") {
      return { type: "boolean" };
    }

    return {};
  }

  const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    ...generateSchema(obj)
  };

  state.text = JSON.stringify(schema, null, 2);
  if (typeof state.postInfo === 'function') {
    state.postInfo("JSON Schema generated");
  }
}
