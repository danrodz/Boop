/**
  {
    "api": 1,
    "name": "JSON to Kotlin Data Class",
    "description": "Generate Kotlin data class from JSON",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,kotlin,dataclass,generate"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function getKotlinType(value) {
      if (value === null) return 'String?';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'List<Any>';
        return 'List<' + getKotlinType(value[0]) + '>';
      }
      if (typeof value === 'object') return 'object';
      if (typeof value === 'number') {
        return Number.isInteger(value) ? 'Int' : 'Double';
      }
      if (typeof value === 'boolean') return 'Boolean';
      return 'String';
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function generateDataClass(obj, name = 'Root', indent = 0) {
      const spaces = '  '.repeat(indent);
      let result = `${spaces}data class ${name}(\n`;

      const entries = Object.entries(obj);
      for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i];
        const type = getKotlinType(value);
        const comma = i < entries.length - 1 ? ',' : '';

        if (type === 'object' && !Array.isArray(value)) {
          const nestedName = capitalize(key);
          result += generateDataClass(value, nestedName, indent + 1);
          result += `${spaces}  val ${key}: ${nestedName}${comma}\n`;
        } else {
          result += `${spaces}  val ${key}: ${type}${comma}\n`;
        }
      }

      result += `${spaces})\n\n`;
      return result;
    }

    state.text = generateDataClass(json).trim();
  } catch (error) {
    state.postError("Failed to generate Kotlin data class: " + error.message);
  }
}
