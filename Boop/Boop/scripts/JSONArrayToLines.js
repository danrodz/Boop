/**
{
  "api": 1,
  "name": "JSON Array to Lines",
  "description": "Converts JSON array to one item per line",
  "author": "Boop",
  "icon": "list.bullet",
  "tags": "json,array,lines,split"
}
**/

function main(state) {
  try {
    const arr = JSON.parse(state.text);
    if (!Array.isArray(arr)) {
      state.postError("Input must be a JSON array");
      return;
    }

    state.text = arr.map(item =>
      typeof item === 'object' ? JSON.stringify(item) : String(item)
    ).join('\n');
  } catch (e) {
    state.postError("Invalid JSON: " + e.message);
  }
}
