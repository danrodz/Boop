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
  var obj;
  try {
    obj = JSON.parse(state.text);
  } catch (e) {
    state.postError("Invalid JSON: " + e.message);
    return;
  }
  
  function generateSchema(value, name) {
    if (value === null) {
      return { type: "null" };
    }
    
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return { type: "array", items: {} };
      }
      // Generate schema from first item
      return {
        type: "array",
        items: generateSchema(value[0])
      };
    }
    
    var type = typeof value;
    
    if (type === "object") {
      var properties = {};
      var required = [];
      
      for (var key in value) {
        properties[key] = generateSchema(value[key], key);
        required.push(key);
      }
      
      return {
        type: "object",
        properties: properties,
        required: required
      };
    }
    
    if (type === "number") {
      return Number.isInteger(value) ? { type: "integer" } : { type: "number" };
    }
    
    if (type === "string") {
      var schema = { type: "string" };
      
      // Detect common formats
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
  
  var schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    ...generateSchema(obj)
  };
  
  state.text = JSON.stringify(schema, null, 2);
  state.postInfo("JSON Schema generated");
}
