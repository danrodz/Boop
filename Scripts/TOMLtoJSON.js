/**
  {
    "api": 1,
    "name": "TOML to JSON",
    "description": "Convert TOML format to JSON",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "toml,json,convert,format"
  }
**/

function main(state) {
  try {
    const toml = state.text;

    // Simple TOML parser
    function parseToml(tomlStr) {
      const lines = tomlStr.split('\n');
      const result = {};
      let currentSection = result;
      let currentPath = [];

      for (let line of lines) {
        line = line.trim();

        // Skip empty lines and comments
        if (!line || line.startsWith('#')) continue;

        // Section header [section]
        if (line.startsWith('[') && line.endsWith(']')) {
          const section = line.slice(1, -1).trim();
          currentPath = section.split('.');

          // Navigate/create nested structure
          currentSection = result;
          for (let key of currentPath) {
            if (!currentSection[key]) currentSection[key] = {};
            currentSection = currentSection[key];
          }
          continue;
        }

        // Key-value pair
        const eqIndex = line.indexOf('=');
        if (eqIndex > -1) {
          let key = line.substring(0, eqIndex).trim();
          let value = line.substring(eqIndex + 1).trim();

          // Parse value
          if (value.startsWith('"') && value.endsWith('"')) {
            // String
            value = value.slice(1, -1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            // String
            value = value.slice(1, -1);
          } else if (value === 'true') {
            value = true;
          } else if (value === 'false') {
            value = false;
          } else if (!isNaN(value)) {
            // Number
            value = value.includes('.') ? parseFloat(value) : parseInt(value);
          } else if (value.startsWith('[') && value.endsWith(']')) {
            // Array
            const arrayContent = value.slice(1, -1);
            value = arrayContent.split(',').map(v => {
              v = v.trim();
              if (v.startsWith('"') && v.endsWith('"')) return v.slice(1, -1);
              if (v === 'true') return true;
              if (v === 'false') return false;
              if (!isNaN(v)) return v.includes('.') ? parseFloat(v) : parseInt(v);
              return v;
            });
          }

          currentSection[key] = value;
        }
      }

      return result;
    }

    const json = parseToml(toml);
    state.text = JSON.stringify(json, null, 2);
  } catch (error) {
    state.postError("Failed to parse TOML: " + error.message);
  }
}
