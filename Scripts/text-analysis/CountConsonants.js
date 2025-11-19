/**
  {
    "api": 1,
    "name": "Count Consonants",
    "description": "Counts consonants in text",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const consonants = state.text.match(/[bcdfghjklmnpqrstvwxyz]/gi) || [];
  state.text = \`Consonants: \${consonants.length}\`;
}
