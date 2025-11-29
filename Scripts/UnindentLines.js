/**
  {
    "api": 1,
    "name": "Unindent Lines",
    "description": "Removes 2 spaces from the beginning of each line",
    "author": "Boop",
    "icon": "decrease.indent",
    "tags": "unindent,outdent,spaces,remove,shift,left"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.map(line => {
    if (line.startsWith('  ')) return line.slice(2);
    if (line.startsWith(' ')) return line.slice(1);
    if (line.startsWith('\t')) return line.slice(1);
    return line;
  }).join('\n');
  state.postInfo(`Unindented ${lines.length} line(s)`);
}
