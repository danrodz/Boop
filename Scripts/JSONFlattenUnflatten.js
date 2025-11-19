/**
  {
    "api": 1,
    "name": "JSON Flatten/Unflatten",
    "description": "Flattens nested JSON or unflattens dot-notation keys",
    "author": "Boop",
    "icon": "arrow.up.and.down.circle.fill",
    "tags": "json,flatten,unflatten,nested,dot"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    // Detect if already flattened (has dot notation keys)
    const keys = Object.keys(json);
    const isFlat = keys.some(k => k.includes('.'));

    if (isFlat) {
      // Unflatten
      const result = {};

      for (const key of keys) {
        const parts = key.split('.');
        let current = result;

        for (let i = 0; i < parts.length - 1; i++) {
          if (!(parts[i] in current)) {
            current[parts[i]] = {};
          }
          current = current[parts[i]];
        }

        current[parts[parts.length - 1]] = json[key];
      }

      state.text = JSON.stringify(result, null, 2);
    } else {
      // Flatten
      const result = {};

      function flatten(obj, prefix = '') {
        for (const key in obj) {
          const newKey = prefix ? `${prefix}.${key}` : key;

          if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            flatten(obj[key], newKey);
          } else {
            result[newKey] = obj[key];
          }
        }
      }

      flatten(json);
      state.text = JSON.stringify(result, null, 2);
    }

  } catch (error) {
    state.postError("Failed to process JSON: " + error.message);
  }
}
