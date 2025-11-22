/**
  {
    "api": 1,
    "name": "Remove Empty Lines",
    "description": "Removes all empty or whitespace-only lines",
    "author": "Boop",
    "icon": "scissors",
    "tags": "empty,blank,lines,remove,whitespace"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const filtered = lines.filter(line => line.trim().length > 0);
  const removed = lines.length - filtered.length;
  state.text = filtered.join('\n');
  state.postInfo(`Removed ${removed} empty line(s)`);
}
