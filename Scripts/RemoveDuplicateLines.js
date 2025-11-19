/**
  {
    "api": 1,
    "name": "Duplicate Line Remover",
    "description": "Removes duplicate lines while preserving order",
    "author": "Boop",
    "icon": "trash.circle.fill",
    "tags": "duplicate,remove,unique,lines"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const seen = new Set();
  const unique = [];
  let duplicateCount = 0;

  for (const line of lines) {
    if (!seen.has(line)) {
      seen.add(line);
      unique.push(line);
    } else {
      duplicateCount++;
    }
  }

  state.text = unique.join('\n');

  if (duplicateCount > 0) {
    state.postInfo(`Removed ${duplicateCount} duplicate line${duplicateCount === 1 ? '' : 's'}`);
  }
}
