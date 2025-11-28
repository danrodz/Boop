/**
  {
    "api": 1,
    "name": "JSON to TOML",
    "description": "Convert JSON to TOML format",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,toml,convert,format"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function toToml(obj, prefix = '') {
      let result = '';
      const tables = [];
      const values = [];

      for (let [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (value === null) {
          continue;
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          // Nested object - create table
          tables.push(`\n[${fullKey}]\n${toToml(value, fullKey)}`);
        } else {
          // Simple value
          let tomlValue;
          if (typeof value === 'string') {
            tomlValue = `"${value.replace(/"/g, '\\"')}"`;
          } else if (Array.isArray(value)) {
            tomlValue = '[' + value.map(v =>
              typeof v === 'string' ? `"${v}"` : v
            ).join(', ') + ']';
          } else {
            tomlValue = String(value);
          }
          values.push(`${key} = ${tomlValue}`);
        }
      }

      return values.join('\n') + (prefix ? '' : tables.join(''));
    }

    state.text = toToml(json);
  } catch (error) {
    state.postError("Failed to convert JSON to TOML: " + error.message);
  }
}
