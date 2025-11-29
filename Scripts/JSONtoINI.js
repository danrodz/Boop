/**
  {
    "api": 1,
    "name": "JSON to INI",
    "description": "Convert JSON to INI configuration file format",
    "author": "Boop",
    "icon": "gear",
    "tags": "json,ini,config,convert"
  }
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);
    let ini = '';

    for (const [section, values] of Object.entries(obj)) {
      if (values && typeof values === 'object' && !Array.isArray(values)) {
        ini += `[${section}]\n`;
        for (const [key, value] of Object.entries(values)) {
          ini += `${key}=${value}\n`;
        }
        ini += '\n';
      } else {
        ini += `${section}=${values}\n`;
      }
    }

    state.text = ini.trim();
    if (typeof state.postInfo === 'function') {
      state.postInfo("Converted to INI format");
    }
  } catch (error) {
    if (typeof state.postError === 'function') {
      state.postError("Failed to convert JSON to INI: " + error.message);
    }
  }
}
