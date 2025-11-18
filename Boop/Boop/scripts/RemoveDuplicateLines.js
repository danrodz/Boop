/**
{
  "api": 1,
  "name": "Remove Duplicate Lines",
  "description": "Removes duplicate lines while preserving order",
  "author": "Boop",
  "icon": "trash",
  "tags": "remove,duplicate,unique,lines"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const seen = new Set();
  const unique = [];

  for (const line of lines) {
    if (!seen.has(line)) {
      seen.add(line);
      unique.push(line);
    }
  }

  state.text = unique.join('\n');
}
