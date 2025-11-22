/**
  {
    "api": 1,
    "name": "Indent Lines",
    "description": "Adds 2 spaces to the beginning of each line",
    "author": "Boop",
    "icon": "increase.indent",
    "tags": "indent,spaces,add,shift,right"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.map(line => '  ' + line).join('\n');
  state.postInfo(`Indented ${lines.length} line(s)`);
}
