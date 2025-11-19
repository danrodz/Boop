/**
{
  "api": 1,
  "name": "Extract JSON Keys",
  "description": "Extracts all keys from JSON object",
  "author": "Boop",
  "icon": "key",
  "tags": "json,keys,extract"
}
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);
    const keys = Object.keys(obj);
    state.text = keys.join('\n');
  } catch (e) {
    state.postError("Invalid JSON: " + e.message);
  }
}
