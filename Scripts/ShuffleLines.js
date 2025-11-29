/**
  {
    "api": 1,
    "name": "Shuffle Lines",
    "description": "Randomly shuffles all lines",
    "author": "Boop",
    "icon": "shuffle",
    "tags": "shuffle,random,lines,randomize"
  }
**/

function main(state) {
  const lines = state.text.split('\n');

  // Fisher-Yates shuffle with crypto random
  for (let i = lines.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lines[i], lines[j]] = [lines[j], lines[i]];
  }

  state.text = lines.join('\n');
}
