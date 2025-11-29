/**
  {
    "api": 1,
    "name": "JSON to TypeScript Interface",
    "description": "Generate TypeScript interface from JSON",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,typescript,interface,generate"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function getType(value) {
      if (value === null) return 'null';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'any[]';
        return getType(value[0]) + '[]';
      }
      if (typeof value === 'object') return 'object';
      if (typeof value === 'number') return 'number';
      if (typeof value === 'boolean') return 'boolean';
      return 'string';
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function generateInterface(obj, name = 'Root', indent = 0) {
      const spaces = '  '.repeat(indent);
      let result = `${spaces}interface ${name} {\n`;

      for (let [key, value] of Object.entries(obj)) {
        const type = getType(value);

        if (type === 'object' && !Array.isArray(value)) {
          const nestedName = capitalize(key);
          result += generateInterface(value, nestedName, indent + 1);
          result += `${spaces}  ${key}: ${nestedName};\n`;
        } else {
          result += `${spaces}  ${key}: ${type};\n`;
        }
      }

      result += `${spaces}}\n\n`;
      return result;
    }

    state.text = generateInterface(json).trim();
  } catch (error) {
    state.postError("Failed to generate TypeScript interface: " + error.message);
  }
}
