/**
{
  "api": 1,
  "name": "Pad Left",
  "description": "Pads each line to 20 characters with spaces on left",
  "author": "Boop",
  "icon": "arrow.left",
  "tags": "pad,left,align,spaces"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const padded = lines.map(line => line.padStart(20, ' '));
  state.text = padded.join('\n');
}
