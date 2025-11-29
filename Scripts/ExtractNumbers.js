/**
  {
    "api": 1,
    "name": "Extract Numbers",
    "description": "Extracts all numbers from text",
    "author": "Boop",
    "icon": "number.circle.fill",
    "tags": "numbers,extract,find,parse"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);

  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found");
    return;
  }

  const unique = [...new Set(numbers)];
  const sum = numbers.map(Number).reduce((a, b) => a + b, 0);

  state.text = numbers.join('\n') + `\n\n---\nFound: ${numbers.length}\nUnique: ${unique.length}\nSum: ${sum}`;
}
