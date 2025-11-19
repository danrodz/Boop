/**
  {
    "api": 1,
    "name": "JSON Array to JSONL",
    "description": "Converts JSON array to JSON Lines format",
    "author": "Boop",
    "icon": "arrow.right",
    "tags": "json,jsonl,ndjson,convert"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    if (!Array.isArray(json)) {
      state.postError("Input must be a JSON array");
      return;
    }
    state.text = json.map(item => JSON.stringify(item)).join('\n');
  } catch (error) {
    state.postError("Failed to convert to JSONL: " + error.message);
  }
}
