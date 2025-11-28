/**
{
  "api": 1,
  "name": "Repeat Text",
  "description": "Repeats text N times (enter count on first line)",
  "author": "Boop",
  "icon": "arrow.triangle.2.circlepath",
  "tags": "repeat,duplicate,multiply"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const count = parseInt(lines[0]) || 1;
  const text = lines.slice(1).join('\n');
  
  const repeated = [];
  for (let i = 0; i < count; i++) {
    repeated.push(text);
  }
  
  state.text = repeated.join('\n');
}
