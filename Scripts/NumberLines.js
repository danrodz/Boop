/**
  {
    "api": 1,
    "name": "Number Lines",
    "description": "Adds line numbers to each line",
    "author": "Boop",
    "icon": "list.number",
    "tags": "number,lines,count,prefix"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const padding = String(lines.length).length;

  const numbered = lines.map((line, i) => {
    const num = String(i + 1).padStart(padding, ' ');
    return `${num}: ${line}`;
  });

  state.text = numbered.join('\n');

  if (typeof state.postInfo === 'function') {
    state.postInfo("Added line numbers");
  }
}
