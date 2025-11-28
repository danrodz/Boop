/**
{
  "api": 1,
  "name": "Repeat Each Line",
  "description": "Repeats each line N times (enter count on first line)",
  "author": "Boop",
  "icon": "arrow.triangle.2.circlepath",
  "tags": "repeat,duplicate,lines"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const count = parseInt(lines[0]) || 2;
  const textLines = lines.slice(1);
  
  const repeated = [];
  for (const line of textLines) {
    for (let i = 0; i < count; i++) {
      repeated.push(line);
    }
  }
  
  state.text = repeated.join('\n');
}
