/**
  {
    "api": 1,
    "name": "Sort JSON Keys",
    "description": "Sorts JSON object keys alphabetically (recursive)",
    "author": "Boop",
    "icon": "arrow.up.arrow.down.circle.fill",
    "tags": "json,sort,keys,alphabetical"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function sortKeys(obj) {
      if (Array.isArray(obj)) {
        return obj.map(sortKeys);
      }

      if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj)
          .sort()
          .reduce((result, key) => {
            result[key] = sortKeys(obj[key]);
            return result;
          }, {});
      }

      return obj;
    }

    state.text = JSON.stringify(sortKeys(json), null, 2);

  } catch (error) {
    state.postError("Invalid JSON: " + error.message);
  }
}
