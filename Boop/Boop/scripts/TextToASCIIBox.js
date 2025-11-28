/**
  {
    "api": 1,
    "name": "Text to ASCII Box",
    "description": "Wrap text in an ASCII art box",
    "author": "Boop",
    "icon": "square",
    "tags": "ascii,box,border,frame"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const maxLength = Math.max(...lines.map(l => l.length));

    const top = '┌' + '─'.repeat(maxLength + 2) + '┐';
    const bottom = '└' + '─'.repeat(maxLength + 2) + '┘';

    const boxed = [top];

    for (const line of lines) {
      const padded = line.padEnd(maxLength, ' ');
      boxed.push(`│ ${padded} │`);
    }

    boxed.push(bottom);

    state.text = boxed.join('\n');
  } catch (error) {
    state.postError("Error creating ASCII box: " + error.message);
  }
}
