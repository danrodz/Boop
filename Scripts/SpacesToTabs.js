/**
  {
    "api": 1,
    "name": "Spaces to Tabs",
    "description": "Converts leading spaces to tabs (2 spaces = 1 tab)",
    "author": "Boop",
    "icon": "arrow.right.arrow.left",
    "tags": "spaces,tabs,convert,indent,whitespace"
  }
**/

function main(state) {
  let count = 0;
  const lines = state.text.split('\n').map(line => {
    const match = line.match(/^( +)/);
    if (match) {
      const spaces = match[1].length;
      const tabs = Math.floor(spaces / 2);
      const remainder = spaces % 2;
      count += tabs;
      return '\t'.repeat(tabs) + ' '.repeat(remainder) + line.slice(spaces);
    }
    return line;
  });
  state.text = lines.join('\n');
  state.postInfo(`Converted to ${count} tab(s)`);
}
