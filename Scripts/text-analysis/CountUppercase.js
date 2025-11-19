/**
  {
    "api": 1,
    "name": "Count Uppercase Letters",
    "description": "Counts uppercase letters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const upper = state.text.match(/[A-Z]/g) || [];
  state.text = \`Uppercase: \${upper.length}\`;
}
