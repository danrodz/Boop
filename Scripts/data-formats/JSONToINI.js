/**
  {
    "api": 1,
    "name": "JSON to INI",
    "description": "Converts JSON to INI format",
    "author": "Boop",
    "icon": "arrow.right",
    "tags": "json,ini,convert,transform,config"
  }
**/

function jsonToIni(obj) {
  let ini = '';

  for (let section in obj) {
    const values = obj[section];

    if (typeof values === 'object' && !Array.isArray(values)) {
      ini += `[${section}]\n`;
      for (let key in values) {
        ini += `${key}=${values[key]}\n`;
      }
      ini += '\n';
    } else {
      ini += `${section}=${values}\n`;
    }
  }

  return ini.trim();
}

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = jsonToIni(json);
  } catch (error) {
    state.postError("Failed to convert JSON to INI: " + error.message);
  }
}
