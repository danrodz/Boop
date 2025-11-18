/**
  {
    "api": 1,
    "name": "Flat to JSON (Unflatten)",
    "description": "Unflattens dot-notation JSON to nested structure",
    "author": "Boop",
    "icon": "arrow.up.left.and.arrow.down.right",
    "tags": "json,unflatten,nest,convert"
  }
**/

function unflattenJson(flat) {
  const obj = {};

  for (let key in flat) {
    const keys = key.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = flat[key];
  }

  return obj;
}

function main(state) {
  try {
    const flat = JSON.parse(state.text);
    const nested = unflattenJson(flat);
    state.text = JSON.stringify(nested, null, 2);
  } catch (error) {
    state.postError("Failed to unflatten JSON: " + error.message);
  }
}
