/**
  {
    "api": 1,
    "name": "JSONL to JSON Array",
    "description": "Converts JSON Lines format to JSON array",
    "author": "Boop",
    "icon": "arrow.left",
    "tags": "jsonl,ndjson,json,convert"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');
    const array = lines.map(line => JSON.parse(line));
    state.text = JSON.stringify(array, null, 2);
  } catch (error) {
    state.postError("Failed to convert JSONL to JSON: " + error.message);
  }
}
