/**
  {
    "api": 1,
    "name": "INI to JSON",
    "description": "Convert INI configuration file to JSON",
    "author": "Boop",
    "icon": "gear",
    "tags": "ini,json,config,convert"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const result = {};
    let currentSection = null;

    for (let rawLine of lines) {
      let line = rawLine.trim();

      if (!line || line.startsWith(';') || line.startsWith('#')) continue;

      if (line.startsWith('[') && line.endsWith(']')) {
        currentSection = line.slice(1, -1);
        result[currentSection] = {};
        continue;
      }

      const eqIndex = line.indexOf('=');
      if (eqIndex > -1) {
        const key = line.substring(0, eqIndex).trim();
        let value = line.substring(eqIndex + 1).trim();

        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (!isNaN(value) && value !== '') {
          value = value.includes('.') ? parseFloat(value) : parseInt(value, 10);
        }

        if (currentSection) {
          result[currentSection][key] = value;
        } else {
          result[key] = value;
        }
      }
    }

    state.text = JSON.stringify(result, null, 2);
    if (typeof state.postInfo === 'function') state.postInfo("Converted to JSON");
  } catch (error) {
    if (typeof state.postError === 'function') {
      state.postError("Failed to parse INI: " + error.message);
    }
  }
}
