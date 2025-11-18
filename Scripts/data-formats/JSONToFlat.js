/**
  {
    "api": 1,
    "name": "JSON to Flat (Flatten)",
    "description": "Flattens nested JSON to single level with dot notation",
    "author": "Boop",
    "icon": "arrow.down.right.and.arrow.up.left",
    "tags": "json,flatten,flat,convert"
  }
**/

function flattenJson(obj, prefix = '') {
  const flat = {};

  for (let key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(flat, flattenJson(value, newKey));
    } else {
      flat[newKey] = value;
    }
  }

  return flat;
}

function main(state) {
  try {
    const json = JSON.parse(state.text);
    const flat = flattenJson(json);
    state.text = JSON.stringify(flat, null, 2);
  } catch (error) {
    state.postError("Failed to flatten JSON: " + error.message);
  }
}
