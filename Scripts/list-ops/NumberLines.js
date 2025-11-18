/**
  {
    "api": 1,
    "name": "Number Lines",
    "description": "Adds line numbers to each line",
    "author": "Boop",
    "icon": "list.bullet",
    "tags": "list,lines,array,transform"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const numbered = lines.map((line, i) => \`\${i + 1}. \${line}\`);
  state.text = numbered.join('\n');
}
