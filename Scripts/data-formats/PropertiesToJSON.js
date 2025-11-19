/**
  {
    "api": 1,
    "name": "Properties to JSON",
    "description": "Converts Java Properties format to JSON",
    "author": "Boop",
    "icon": "arrow.left",
    "tags": "properties,json,convert,transform,java"
  }
**/

function propertiesToJson(text) {
  const lines = text.split('\n');
  const obj = {};

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#') || line.startsWith('!')) continue;

    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    const value = line.slice(eqIndex + 1).trim();

    const keys = key.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
  }

  return obj;
}

function main(state) {
  try {
    const json = propertiesToJson(state.text);
    state.text = JSON.stringify(json, null, 2);
  } catch (error) {
    state.postError("Failed to convert Properties to JSON: " + error.message);
  }
}
