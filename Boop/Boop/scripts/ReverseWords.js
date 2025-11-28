/**
{
  "api": 1,
  "name": "Reverse Words",
  "description": "Reverses the order of words in each line",
  "author": "Boop",
  "icon": "arrow.left.arrow.right",
  "tags": "reverse,words,flip"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const reversed = lines.map(line => {
    return line.split(/\s+/).reverse().join(' ');
  });
  state.text = reversed.join('\n');
}
