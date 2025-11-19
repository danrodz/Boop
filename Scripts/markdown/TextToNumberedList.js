/**
  {
    "api": 1,
    "name": "Convert to Numbered List",
    "description": "Converts lines to numbered list",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "markdown,format,convert,documentation"
  }
**/

function main(state) {
  const lines = state.text.split('\n').filter(l => l.trim());
  state.text = lines.map((line, i) => \`\${i + 1}. \${line}\`).join('\n');
}
