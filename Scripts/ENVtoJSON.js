/**
  {
    "api": 1,
    "name": "ENV to JSON",
    "description": "Convert .env file format to JSON",
    "author": "Boop",
    "icon": "gearshape",
    "tags": "env,json,environment,convert"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const result = {};

    for (let line of lines) {
      line = line.trim();

      // Skip comments and empty lines
      if (!line || line.startsWith('#')) continue;

      // Parse KEY=value
      const eqIndex = line.indexOf('=');
      if (eqIndex > -1) {
        const key = line.substring(0, eqIndex).trim();
        let value = line.substring(eqIndex + 1).trim();

        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }

        result[key] = value;
      }
    }

    state.text = JSON.stringify(result, null, 2);
  } catch (error) {
    state.postError("Failed to parse ENV: " + error.message);
  }
}
