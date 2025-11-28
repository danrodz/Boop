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
      if (typeof value === 'string') return `"${value.replace(/"/g, '\\"')}"`;
      if (typeof value === 'boolean') return value.toString();
      if (typeof value === 'number') return value.toString();
      if (Array.isArray(value)) {
        const items = value.map(v => convertValue(v)).join(', ');
        return `[${items}]`;
      }
      if (value === null) return 'null';
      return String(value);
    }

    function processObject(obj, prefix = '') {
      let result = '';
      const simple = {};
      const nested = {};

      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          nested[key] = value;
        } else {
          simple[key] = value;
        }
      }

      for (const [key, value] of Object.entries(simple)) {
        result += `${key} = ${convertValue(value)}\n`;
      }

      for (const [key, value] of Object.entries(nested)) {
        const section = prefix ? `${prefix}.${key}` : key;
        result += `\n[${section}]\n`;
        result += processObject(value, section);
      }

      return result;
    }

    toml = processObject(obj);
    state.text = toml.trim();
    if (typeof state.postInfo === 'function') {
      state.postInfo("Converted to TOML");
    }
  } catch (error) {
    if (typeof state.postError === 'function') {
      state.postError("Failed to convert JSON to TOML: " + error.message);
    }
  }
}
