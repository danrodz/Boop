/**
  {
    "api": 1,
    "name": "JSON to YAML",
    "description": "Convert JSON to YAML format",
    "author": "Boop",
    "icon": "doc",
    "tags": "json,yaml,convert,format"
  }
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);

    function toYAML(obj, indent = 0) {
      const spaces = '  '.repeat(indent);
      let yaml = '';

      if (Array.isArray(obj)) {
        obj.forEach(item => {
          if (typeof item === 'object' && item !== null) {
            yaml += `${spaces}-\n${toYAML(item, indent + 1)}`;
          } else {
            yaml += `${spaces}- ${item}\n`;
          }
        });
      } else if (typeof obj === 'object' && obj !== null) {
        Object.entries(obj).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            yaml += `${spaces}${key}:\n${toYAML(value, indent + 1)}`;
          } else if (Array.isArray(value)) {
            yaml += `${spaces}${key}:\n${toYAML(value, indent + 1)}`;
          } else {
            const valStr = typeof value === 'string' ? `"${value}"` : value;
            yaml += `${spaces}${key}: ${valStr}\n`;
          }
        });
      }

      return yaml;
    }

    state.text = toYAML(obj).trim();
    state.postInfo("Converted to YAML");
  } catch (error) {
    state.postError(`Invalid JSON: ${error.message}`);
  }
}
