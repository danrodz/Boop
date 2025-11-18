/**
  {
    "api": 1,
    "name": "First Word Uppercase",
    "description": "Uppercases first word",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) {
  const words = state.text.split(' ');
  words[0] = words[0].toUpperCase();
  state.text = words.join(' ');
}
