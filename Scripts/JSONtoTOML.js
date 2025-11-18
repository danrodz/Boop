/**
  {
    "api": 1,
    "name": "JSON to TOML",
    "description": "Convert JSON to TOML format",
    "author": "Boop",
    "icon": "doc",
    "tags": "json,toml,convert,format"
  }
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);
    let toml = '';

    function convertValue(value) {
      if (typeof value === 'string') return `"${value}"`;
      if (typeof value === 'boolean') return value.toString();
      if (typeof value === 'number') return value.toString();
      if (Array.isArray(value)) {
        const items = value.map(v => convertValue(v)).join(', ');
        return `[${items}]`;
      }
      return value;
    }

    function processObject(obj, prefix = '') {
      let result = '';
      const simple = {};
      const nested = {};

      // Separate simple and nested values
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
          nested[key] = value;
        } else {
          simple[key] = value;
        }
      }

      // Write simple values
      for (const [key, value] of Object.entries(simple)) {
        result += `${key} = ${convertValue(value)}\n`;
      }

      // Write nested objects as sections
      for (const [key, value] of Object.entries(nested)) {
        const section = prefix ? `${prefix}.${key}` : key;
        result += `\n[${section}]\n`;
        result += processObject(value, section);
      }

      return result;
    }

    toml = processObject(obj);
    state.text = toml.trim();
    state.postInfo("Converted to TOML");
  } catch (error) {
    state.postError(`Invalid JSON: ${error.message}`);
  }
}
