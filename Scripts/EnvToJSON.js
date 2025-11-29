/**
  {
    "api": 1,
    "name": ".env to JSON",
    "description": "Convert .env file format to JSON object",
    "author": "Boop",
    "icon": "gear",
    "tags": "env,json,environment,convert,config"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const obj = {};

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex > 0) {
      const key = trimmed.substring(0, separatorIndex).trim();
      let value = trimmed.substring(separatorIndex + 1).trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Try to parse as number or boolean
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (!isNaN(value) && value !== '') value = Number(value);

      obj[key] = value;
    }
  });

  state.text = JSON.stringify(obj, null, 2);
  state.postInfo("Converted to JSON");
}
