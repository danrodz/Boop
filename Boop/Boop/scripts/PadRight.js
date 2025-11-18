/**
{
  "api": 1,
  "name": "Pad Right",
  "description": "Pads each line to 20 characters with spaces on right",
  "author": "Boop",
  "icon": "arrow.right",
  "tags": "pad,right,align,spaces"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const padded = lines.map(line => line.padEnd(20, ' '));
  state.text = padded.join('\n');
}
