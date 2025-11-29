/**
{
  "api": 1,
  "name": "Text to Binary",
  "description": "Converts text to binary (8-bit)",
  "author": "Boop",
  "icon": "01.circle",
  "tags": "binary,encode,text,ascii"
}
**/

function main(state) {
  let binary = '';

  for (let i = 0; i < state.text.length; i++) {
    const bin = state.text.charCodeAt(i).toString(2);
    binary += bin.padStart(8, '0') + ' ';
  }

  state.text = binary.trim();
}
