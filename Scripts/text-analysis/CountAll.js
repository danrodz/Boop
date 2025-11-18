/**
  {
    "api": 1,
    "name": "Count All Stats",
    "description": "Shows comprehensive character statistics",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const text = state.text;
  const stats = [
    \`Characters: \${text.length}\`,
    \`Words: \${text.split(/\s+/).filter(w => w).length}\`,
    \`Lines: \${text.split('\n').length}\`,
    \`Sentences: \${text.split(/[.!?]+/).filter(s => s.trim()).length}\`,
    \`Paragraphs: \${text.split(/\n\n+/).filter(p => p.trim()).length}\`
  ];
  state.text = stats.join('\n');
}
