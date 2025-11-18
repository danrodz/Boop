/**
  {
    "api": 1,
    "name": "INI to JSON",
    "description": "Convert INI configuration to JSON",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "ini,json,config,convert"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const result = {};
    let currentSection = null;

    for (let line of lines) {
      line = line.trim();

      // Skip comments and empty lines
      if (!line || line.startsWith(';') || line.startsWith('#')) continue;

      // Section header
      if (line.startsWith('[') && line.endsWith(']')) {
        currentSection = line.slice(1, -1);
        result[currentSection] = {};
        continue;
      }

      // Key-value pair
      const eqIndex = line.indexOf('=');
      if (eqIndex > -1) {
        const key = line.substring(0, eqIndex).trim();
        let value = line.substring(eqIndex + 1).trim();

        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }

        // Try to parse as number or boolean
        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (!isNaN(value) && value !== '') {
          value = value.includes('.') ? parseFloat(value) : parseInt(value);
        }

        if (currentSection) {
          result[currentSection][key] = value;
        } else {
          result[key] = value;
        }
      }
    }

    state.text = JSON.stringify(result, null, 2);
  } catch (error) {
    state.postError("Failed to parse INI: " + error.message);
  }
}
