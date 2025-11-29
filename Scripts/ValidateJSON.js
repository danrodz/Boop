/**
  {
    "api": 1,
    "name": "Validate JSON",
    "description": "Validates JSON and shows errors",
    "author": "Boop",
    "icon": "checkmark.circle.fill",
    "tags": "json,validate,check,lint"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    const type = Array.isArray(json) ? 'array' : typeof json;
    const count = Array.isArray(json) ? json.length :
                  typeof json === 'object' && json !== null ? Object.keys(json).length : 1;

    state.postInfo(`✓ Valid JSON (${type} with ${count} ${Array.isArray(json) ? 'items' : 'keys'})`);
  } catch (error) {
    // Try to provide helpful error location
    const match = error.message.match(/position (\d+)/);
    if (match) {
      const pos = parseInt(match[1]);
      const before = state.text.substring(Math.max(0, pos - 20), pos);
      const after = state.text.substring(pos, pos + 20);
      state.postError(`Invalid JSON at position ${pos}:\n...${before}>>>HERE<<<${after}...\n\n${error.message}`);
    } else {
      state.postError("Invalid JSON: " + error.message);
    }
  }
}
