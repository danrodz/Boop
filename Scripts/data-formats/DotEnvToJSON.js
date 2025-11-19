/**
  {
    "api": 1,
    "name": ".env to JSON",
    "description": "Converts .env format to JSON",
    "author": "Boop",
    "icon": "arrow.left",
    "tags": "env,dotenv,json,convert,transform,config"
  }
**/

function envToJson(text) {
  const lines = text.split('\n');
  const obj = {};

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;

    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    obj[key] = value;
  }

  return obj;
}

function main(state) {
  try {
    const json = envToJson(state.text);
    state.text = JSON.stringify(json, null, 2);
  } catch (error) {
    state.postError("Failed to convert .env to JSON: " + error.message);
  }
}
