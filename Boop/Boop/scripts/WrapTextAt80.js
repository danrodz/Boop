/**
{
  "api": 1,
  "name": "Wrap Text at 80",
  "description": "Wraps text at 80 characters",
  "author": "Boop",
  "icon": "text.alignleft",
  "tags": "wrap,width,80,column"
}
**/

function main(state) {
  const maxWidth = 80;
  const words = state.text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length > maxWidth) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }

  if (currentLine) lines.push(currentLine.trim());
  state.text = lines.join('\n');
}
