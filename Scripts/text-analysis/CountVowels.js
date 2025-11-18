/**
  {
    "api": 1,
    "name": "Count Vowels",
    "description": "Counts vowels in text",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const vowels = state.text.match(/[aeiou]/gi) || [];
  state.text = \`Vowels: \${vowels.length}\`;
}
