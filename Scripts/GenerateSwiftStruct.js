/**
  {
    "api": 1,
    "name": "JSON to Swift Struct",
    "description": "Generate Swift struct with Codable from JSON",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,swift,struct,codable,generate"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function getSwiftType(value) {
      if (value === null) return 'String?';
      if (Array.isArray(value)) {
        if (value.length === 0) return '[String]';
        return '[' + getSwiftType(value[0]) + ']';
      }
      if (typeof value === 'object') return 'object';
      if (typeof value === 'number') {
        return Number.isInteger(value) ? 'Int' : 'Double';
      }
      if (typeof value === 'boolean') return 'Bool';
      return 'String';
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function generateStruct(obj, name = 'Root', indent = 0) {
      const spaces = '    '.repeat(indent);
      let result = `${spaces}struct ${name}: Codable {\n`;

      for (let [key, value] of Object.entries(obj)) {
        const type = getSwiftType(value);

        if (type === 'object' && !Array.isArray(value)) {
          const nestedName = capitalize(key);
          result += generateStruct(value, nestedName, indent + 1);
          result += `${spaces}    let ${key}: ${nestedName}\n`;
        } else {
          result += `${spaces}    let ${key}: ${type}\n`;
        }
      }

      result += `${spaces}}\n\n`;
      return result;
    }

    state.text = generateStruct(json).trim();
  } catch (error) {
    state.postError("Failed to generate Swift struct: " + error.message);
  }
}
