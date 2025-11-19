/**
  {
    "api": 1,
    "name": "Reverse Lines Order",
    "description": "Reverses the order of lines",
    "author": "Boop",
    "icon": "list.bullet",
    "tags": "list,lines,array,transform"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.reverse().join('\n');
}
