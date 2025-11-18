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
      if (typeof values === 'object' && !Array.isArray(values)) {
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
    state.postInfo("Converted to INI format");
  } catch (error) {
    state.postError(`Invalid JSON: ${error.message}`);
  }
}
