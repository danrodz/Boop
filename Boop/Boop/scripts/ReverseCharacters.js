/**
{
  "api": 1,
  "name": "Reverse Characters",
  "description": "Reverses all characters in each line",
  "author": "Boop",
  "icon": "arrow.left.arrow.right",
  "tags": "reverse,characters,flip"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const reversed = lines.map(line => {
    return line.split('').reverse().join('');
  });
  state.text = reversed.join('\n');
}
