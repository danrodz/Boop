/**
  {
    "api": 1,
    "name": "Lines to Array Literal",
    "description": "Converts lines to JavaScript/JSON array",
    "author": "Boop",
    "icon": "list.bullet.rectangle",
    "tags": "lines,array,javascript,json,convert"
  }
**/

function main(state) {
  const lines = state.text.split('\n');

  // Remove empty lines and escape quotes
  const items = lines
    .filter(line => line.trim())
    .map(line => {
      const escaped = line.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      return `  "${escaped}"`;
    });

  const result = `[\n${items.join(',\n')}\n]`;

  state.text = result;
}
