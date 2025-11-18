/**
  {
    "api": 1,
    "name": "Count Digits",
    "description": "Counts digits in text",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const digits = state.text.match(/\d/g) || [];
  state.text = \`Digits: \${digits.length}\`;
}
