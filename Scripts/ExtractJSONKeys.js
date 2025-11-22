/**
  {
    "api": 1,
    "name": "Extract JSON Keys",
    "description": "Extracts all keys from JSON (nested)",
    "author": "Boop",
    "icon": "key.fill",
    "tags": "json,keys,extract,nested"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    const keys = new Set();

    function extractKeys(obj, prefix = '') {
      if (typeof obj !== 'object' || obj === null) return;

      for (const key in obj) {
        const fullPath = prefix ? `${prefix}.${key}` : key;
        keys.add(fullPath);

        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          extractKeys(obj[key], fullPath);
        } else if (Array.isArray(obj[key]) && obj[key].length > 0 && typeof obj[key][0] === 'object') {
          extractKeys(obj[key][0], `${fullPath}[]`);
        }
      }
    }

    extractKeys(json);

    const sortedKeys = [...keys].sort();
    state.text = sortedKeys.join('\n');
    state.postInfo(`Found ${sortedKeys.length} keys`);

  } catch (error) {
    state.postError("Failed to parse JSON: " + error.message);
  }
}
