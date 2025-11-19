/**
  {
    "api": 1,
    "name": "Brainfuck Encode",
    "description": "Encodes text to Brainfuck code that prints it",
    "author": "Boop",
    "icon": "brain.head.profile",
    "tags": "brainfuck,encode,esoteric"
  }
**/

function main(state) {
  const text = state.text;
  let result = '';
  let currentValue = 0;

  for (let char of text) {
    const targetValue = char.charCodeAt(0);
    const diff = targetValue - currentValue;

    if (diff > 0) {
      result += '+'.repeat(diff);
    } else if (diff < 0) {
      result += '-'.repeat(-diff);
    }

    result += '.';
    currentValue = targetValue;
  }

  state.text = result;
}
