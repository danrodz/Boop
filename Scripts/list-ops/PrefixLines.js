/**
  {
    "api": 1,
    "name": "Prefix Each Line",
    "description": "Adds '> ' prefix to each line",
    "author": "Boop",
    "icon": "list.bullet",
    "tags": "list,lines,array,transform"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.map(line => '> ' + line).join('\n');
}
