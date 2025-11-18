/**
  {
    "api": 1,
    "name": "Remove Duplicate Lines",
    "description": "Remove duplicate lines from text",
    "author": "Boop",
    "icon": "collapse",
    "tags": "duplicate,remove,unique,lines,text"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const uniqueLines = [...new Set(lines)];

  const removed = lines.length - uniqueLines.length;

  state.text = uniqueLines.join('\n');
  state.postInfo(`Removed ${removed} duplicate line(s)`);
}
