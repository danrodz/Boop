/**
  {
    "api": 1,
    "name": "Pretty Print JSON",
    "description": "Formats JSON with smart indentation and validation",
    "author": "Boop",
    "icon": "doc.text.fill",
    "tags": "json,format,pretty,beautify,indent"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    const formatted = JSON.stringify(json, null, 2);

    // Count elements for statistics
    const countElements = (obj) => {
      if (Array.isArray(obj)) return obj.length;
      if (typeof obj === 'object' && obj !== null) return Object.keys(obj).length;
      return 0;
    };

    const count = countElements(json);
    const type = Array.isArray(json) ? 'array' : typeof json === 'object' ? 'object' : typeof json;

    state.text = formatted;
    state.postInfo(`✓ Valid JSON (${type} with ${count} ${Array.isArray(json) ? 'items' : 'keys'})`);

  } catch (error) {
    state.postError("Invalid JSON: " + error.message);
  }
}
