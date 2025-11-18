/**
  {
    "api": 1,
    "name": "Wrap Text at 10 chars",
    "description": "Wraps text at 10 characters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility"
  }
**/

function main(state) {
  const words = state.text.split(' ');
  let lines = [];
  let currentLine = '';
  
  for (let word of words) {
    if ((currentLine + word).length > 10) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  if (currentLine) lines.push(currentLine.trim());
  
  state.text = lines.join('\n');
}
