/**
  {
    "api": 1,
    "name": "Wrap Text at 20 chars",
    "description": "Wraps text at 20 characters",
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
    if ((currentLine + word).length > 20) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  if (currentLine) lines.push(currentLine.trim());
  
  state.text = lines.join('\n');
}
