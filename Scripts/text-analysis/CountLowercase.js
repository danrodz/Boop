/**
  {
    "api": 1,
    "name": "Count Lowercase Letters",
    "description": "Counts lowercase letters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const lower = state.text.match(/[a-z]/g) || [];
  state.text = \`Lowercase: \${lower.length}\`;
}
