/**
  {
    "api": 1,
    "name": "INI to JSON",
    "description": "Converts INI format to JSON",
    "author": "Boop",
    "icon": "arrow.left",
    "tags": "ini,json,convert,transform,config"
  }
**/

function iniToJson(text) {
  const lines = text.split('\n');
  const obj = {};
  let currentSection = null;

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith(';') || line.startsWith('#')) continue;

    if (line.startsWith('[') && line.endsWith(']')) {
      currentSection = line.slice(1, -1);
      obj[currentSection] = {};
    } else {
      const eqIndex = line.indexOf('=');
      if (eqIndex === -1) continue;

      const key = line.slice(0, eqIndex).trim();
      const value = line.slice(eqIndex + 1).trim();

      if (currentSection) {
        obj[currentSection][key] = value;
      } else {
        obj[key] = value;
      }
    }
  }

  return obj;
}

function main(state) {
  try {
    const json = iniToJson(state.text);
    state.text = JSON.stringify(json, null, 2);
  } catch (error) {
    state.postError("Failed to convert INI to JSON: " + error.message);
  }
}
