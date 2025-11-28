/**
  {
    "api": 1,
    "name": "JSON to Go Struct",
    "description": "Generate Go struct from JSON",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,go,golang,struct,generate"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function getGoType(value) {
      if (value === null) return 'interface{}';
      if (Array.isArray(value)) {
        if (value.length === 0) return '[]interface{}';
        return '[]' + getGoType(value[0]);
      }
      if (typeof value === 'object') return 'object';
      if (typeof value === 'number') {
        return Number.isInteger(value) ? 'int' : 'float64';
      }
      if (typeof value === 'boolean') return 'bool';
      return 'string';
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function generateStruct(obj, name = 'Root', indent = 0) {
      const spaces = '  '.repeat(indent);
      let result = `${spaces}type ${name} struct {\n`;

      for (let [key, value] of Object.entries(obj)) {
        const fieldName = capitalize(key);
        const type = getGoType(value);

        if (type === 'object' && !Array.isArray(value)) {
          const nestedName = capitalize(key);
          result += generateStruct(value, nestedName, indent + 1);
          result += `${spaces}  ${fieldName} ${nestedName} \`json:"${key}"\`\n`;
        } else {
          result += `${spaces}  ${fieldName} ${type} \`json:"${key}"\`\n`;
        }
      }

      result += `${spaces}}\n\n`;
      return result;
    }

    state.text = generateStruct(json).trim();
  } catch (error) {
    state.postError("Failed to generate Go struct: " + error.message);
  }
}
