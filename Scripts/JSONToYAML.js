/**
  {
    "api": 1,
    "name": "JSON to YAML",
    "description": "Converts JSON to YAML format",
    "author": "Boop",
    "icon": "arrow.left.doc.on.doc",
    "tags": "json,yaml,convert,export"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function toYAML(obj, indent = 0) {
      const spaces = '  '.repeat(indent);
      let yaml = '';

      if (Array.isArray(obj)) {
        obj.forEach(item => {
          if (typeof item === 'object' && item !== null) {
            yaml += spaces + '-\n';
            yaml += toYAML(item, indent + 1);
          } else {
            yaml += spaces + '- ' + formatValue(item) + '\n';
          }
        });
      } else if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => {
          const value = obj[key];

          if (Array.isArray(value)) {
            yaml += spaces + key + ':\n';
            yaml += toYAML(value, indent + 1);
          } else if (typeof value === 'object' && value !== null) {
            yaml += spaces + key + ':\n';
            yaml += toYAML(value, indent + 1);
          } else {
            yaml += spaces + key + ': ' + formatValue(value) + '\n';
          }
        });
      }

      return yaml;
    }

    function formatValue(val) {
      if (val === null) return 'null';
      if (typeof val === 'boolean') return val.toString();
      if (typeof val === 'number') return val.toString();
      if (typeof val === 'string') {
        // Quote strings that contain special characters
        if (val.includes(':') || val.includes('#') || val.includes('\n')) {
          return '"' + val.replace(/"/g, '\\"') + '"';
        }
        return val;
      }
      return String(val);
    }

    state.text = toYAML(json).trim();

  } catch (error) {
    state.postError("Failed to convert JSON: " + error.message);
  }
}
