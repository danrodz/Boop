/**
  {
    "api": 1,
    "name": "JSON to .env",
    "description": "Convert JSON object to .env file format",
    "author": "Boop",
    "icon": "gear",
    "tags": "json,env,environment,convert,config"
  }
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);
    let env = '';

    function flatten(obj, prefix = '') {
      for (const [key, value] of Object.entries(obj)) {
        const envKey = prefix ? `${prefix}_${key}` : key;
        const upperKey = envKey.toUpperCase();

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          flatten(value, upperKey);
        } else {
          const envValue = typeof value === 'string' ? value : JSON.stringify(value);
          env += `${upperKey}=${envValue}\n`;
        }
      }
    }

    flatten(obj);
    state.text = env.trim();
    state.postInfo("Converted to .env format");
  } catch (error) {
    state.postError(`Invalid JSON: ${error.message}`);
  }
}
