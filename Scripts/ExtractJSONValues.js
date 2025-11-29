/**
  {
    "api": 1,
    "name": "Extract JSON Values",
    "description": "Extracts all primitive values from JSON",
    "author": "Boop",
    "icon": "list.bullet.clipboard.fill",
    "tags": "json,values,extract,flatten"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    const values = [];

    function extractValues(obj) {
      if (obj === null) {
        values.push('null');
        return;
      }

      if (typeof obj !== 'object') {
        values.push(String(obj));
        return;
      }

      if (Array.isArray(obj)) {
        obj.forEach(extractValues);
        return;
      }

      Object.values(obj).forEach(extractValues);
    }

    extractValues(json);

    const uniqueValues = [...new Set(values)];
    state.text = uniqueValues.join('\n');
    state.postInfo(`Found ${values.length} values (${uniqueValues.length} unique)`);

  } catch (error) {
    state.postError("Failed to parse JSON: " + error.message);
  }
}
