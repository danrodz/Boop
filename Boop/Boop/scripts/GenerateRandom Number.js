/**
{
  "api": 1,
  "name": "Generate Random Numbers",
  "description": "Generates N random numbers (count on line 1)",
  "author": "Boop",
  "icon": "die.face.5",
  "tags": "random,number,generate"
}
**/

function main(state) {
  const count = parseInt(state.text.trim()) || 10;
  const numbers = [];

  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * 1000));
  }

  state.text = numbers.join('\n');
}
