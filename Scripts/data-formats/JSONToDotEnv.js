/**
  {
    "api": 1,
    "name": "JSON to .env",
    "description": "Converts JSON to .env format",
    "author": "Boop",
    "icon": "arrow.right",
    "tags": "json,env,dotenv,convert,transform,config"
  }
**/

function jsonToEnv(obj, prefix = '') {
  let env = '';

  for (let key in obj) {
    const envKey = prefix ? `${prefix}_${key}` : key;
    const value = obj[key];

    if (typeof value === 'object' && !Array.isArray(value)) {
      env += jsonToEnv(value, envKey.toUpperCase());
    } else {
      env += `${envKey.toUpperCase()}=${value}\n`;
    }
  }

  return env;
}

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = jsonToEnv(json);
  } catch (error) {
    state.postError("Failed to convert JSON to .env: " + error.message);
  }
}
