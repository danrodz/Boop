/**
  {
    "api": 1,
    "name": "Count Special Characters",
    "description": "Counts special characters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const special = state.text.match(/[^a-zA-Z0-9\s]/g) || [];
  state.text = \`Special characters: \${special.length}\`;
}
