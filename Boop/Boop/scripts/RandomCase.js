/**
{
  "api": 1,
  "name": "Random Case (Spongebob)",
  "description": "Randomizes the case of letters (sPoNgEbOb MoCkInG)",
  "author": "Boop",
  "icon": "die.face.3",
  "tags": "random,case,spongebob,mocking"
}
**/

function main(state) {
  state.text = state.text.split('').map(char => {
    if (!/[a-zA-Z]/.test(char)) return char;
    return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
  }).join('');
}
