/**
  {
    "api": 1,
    "name": "JSON5 to JSON",
    "description": "Convert JSON5 (with comments/trailing commas) to standard JSON",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "json5,json,convert,comments"
  }
**/

function main(state) {
  try {
    let text = state.text;

    // Remove single-line comments
    text = text.replace(/\/\/.*$/gm, '');

    // Remove multi-line comments
    text = text.replace(/\/\*[\s\S]*?\*\//g, '');

    // Remove trailing commas
    text = text.replace(/,(\s*[}\]])/g, '$1');

    // Parse and re-stringify to ensure valid JSON
    const obj = JSON.parse(text);
    state.text = JSON.stringify(obj, null, 2);
  } catch (error) {
    state.postError("Failed to parse JSON5: " + error.message);
  }
}
