/**
  {
    "api": 1,
    "name": "JSON to INI",
    "description": "Convert JSON to INI configuration format",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "json,ini,config,convert"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    let result = '';

    for (let [key, value] of Object.entries(json)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Section
        result += `[${key}]\n`;
        for (let [subKey, subValue] of Object.entries(value)) {
          result += `${subKey}=${subValue}\n`;
        }
        result += '\n';
      } else {
        // Top-level key-value
        result += `${key}=${value}\n`;
      }
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to convert JSON to INI: " + error.message);
  }
}
