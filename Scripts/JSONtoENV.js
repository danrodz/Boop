/**
  {
    "api": 1,
    "name": "JSON to ENV",
    "description": "Convert JSON to .env file format",
    "author": "Boop",
    "icon": "gearshape",
    "tags": "json,env,environment,convert"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    let result = '';

    function flattenObject(obj, prefix = '') {
      for (let [key, value] of Object.entries(obj)) {
        const envKey = prefix ? `${prefix}_${key}` : key;

        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
          flattenObject(value, envKey);
        } else {
          const envValue = typeof value === 'string' && value.includes(' ')
            ? `"${value}"`
            : String(value);
          result += `${envKey.toUpperCase()}=${envValue}\n`;
        }
      }
    }

    flattenObject(json);
    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to convert JSON to ENV: " + error.message);
  }
}
