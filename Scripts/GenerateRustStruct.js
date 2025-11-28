/**
  {
    "api": 1,
    "name": "JSON to Rust Struct",
    "description": "Generate Rust struct from JSON with Serde",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,rust,struct,serde,generate"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function getRustType(value) {
      if (value === null) return 'Option<String>';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'Vec<String>';
        return 'Vec<' + getRustType(value[0]) + '>';
      }
      if (typeof value === 'object') return 'object';
      if (typeof value === 'number') {
        return Number.isInteger(value) ? 'i64' : 'f64';
      }
      if (typeof value === 'boolean') return 'bool';
      return 'String';
    }

    function toSnakeCase(str) {
      return str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function generateStruct(obj, name = 'Root', indent = 0) {
      const spaces = '  '.repeat(indent);
      let result = `${spaces}#[derive(Debug, Serialize, Deserialize)]\n`;
      result += `${spaces}struct ${name} {\n`;

      for (let [key, value] of Object.entries(obj)) {
        const fieldName = toSnakeCase(key);
        const type = getRustType(value);

        if (type === 'object' && !Array.isArray(value)) {
          const nestedName = capitalize(key);
          result += generateStruct(value, nestedName, indent + 1);
          result += `${spaces}  ${fieldName}: ${nestedName},\n`;
        } else {
          result += `${spaces}  ${fieldName}: ${type},\n`;
        }
      }

      result += `${spaces}}\n\n`;
      return result;
    }

    state.text = generateStruct(json).trim();
  } catch (error) {
    state.postError("Failed to generate Rust struct: " + error.message);
  }
}
