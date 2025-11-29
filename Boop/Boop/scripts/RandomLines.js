/**
{
  "api": 1,
  "name": "Random Lines",
  "description": "Gets N random lines (count on line 1)",
  "author": "Boop",
  "icon": "shuffle",
  "tags": "random,sample,lines"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const n = parseInt(lines[0]) || 5;
  const textLines = lines.slice(1);
  
  const shuffled = textLines.sort(() => Math.random() - 0.5);
  const result = shuffled.slice(0, n);
  
  state.text = result.join('\n');
}
