/**
  {
    "api": 1,
    "name": "Indent Lines (2 spaces)",
    "description": "Indents each line with 2 spaces",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.map(line => '  ' + line).join('\n');
}
