/**
  {
    "api": 1,
    "name": "Find Longest Word",
    "description": "Finds longest word in text",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const words = state.text.match(/\b\w+\b/g) || [];
  const longest = words.reduce((a, b) => a.length > b.length ? a : b, '');
  state.text = \`Longest word: "\${longest}" (\${longest.length} chars)\`;
}
