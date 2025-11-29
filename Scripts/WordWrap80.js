/**
  {
    "api": 1,
    "name": "Word Wrap (80 columns)",
    "description": "Wraps text at 80 characters",
    "author": "Boop",
    "icon": "text.alignleft",
    "tags": "wrap,text,width,format,80"
  }
**/

function main(state) {
  const maxWidth = 80;
  const paragraphs = state.text.split(/\n\n+/);

  const wrapped = paragraphs.map(para => {
    const words = para.replace(/\n/g, ' ').split(/\s+/);
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      if (!word) continue;

      if (currentLine.length + word.length + 1 <= maxWidth) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) lines.push(currentLine);
    return lines.join('\n');
  });

  state.text = wrapped.join('\n\n');
}
