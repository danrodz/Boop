/**
  {
    "api": 1,
    "name": "Remove Duplicate Lines",
    "description": "Removes duplicate lines, keeping first occurrence",
    "author": "Boop",
    "icon": "scissors",
    "tags": "duplicate,unique,lines,remove,dedupe"
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

  const removed = lines.length - unique.length;
  state.text = unique.join('\n');

  if (typeof state.postInfo === 'function') {
    state.postInfo(`Removed ${removed} duplicate line(s)`);
  }
}
