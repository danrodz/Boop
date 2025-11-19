/**
  {
    "api": 1,
    "name": "Remove Empty Lines",
    "description": "Removes all empty/whitespace-only lines",
    "author": "Boop",
    "icon": "trash.circle.fill",
    "tags": "remove,empty,lines,clean,whitespace"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const nonEmpty = lines.filter(line => line.trim().length > 0);

  const removed = lines.length - nonEmpty.length;

  state.text = nonEmpty.join('\n');

  if (removed > 0) {
    state.postInfo(`Removed ${removed} empty line${removed === 1 ? '' : 's'}`);
  }
}
