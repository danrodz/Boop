/**
  {
    "api": 1,
    "name": "Find Shortest Word",
    "description": "Finds shortest word in text",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const words = state.text.match(/\b\w+\b/g) || [];
  const shortest = words.reduce((a, b) => a.length < b.length ? a : b, words[0] || '');
  state.text = \`Shortest word: "\${shortest}" (\${shortest.length} chars)\`;
}
