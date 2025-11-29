/**
  {
    "api": 1,
    "name": "Generate Random Numbers",
    "description": "Generates random numbers in range",
    "author": "Boop",
    "icon": "dice.fill",
    "tags": "random,numbers,generate,range"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    let min = 1, max = 100, count = 1;

    // Parse input: "min max count" or "max" or "min max"
    const parts = input.split(/\s+/).map(Number);

    if (parts.length === 1 && !isNaN(parts[0])) {
      max = parts[0];
    } else if (parts.length === 2 && parts.every(n => !isNaN(n))) {
      [min, max] = parts;
    } else if (parts.length >= 3 && parts.every(n => !isNaN(n))) {
      [min, max, count] = parts;
    }

    count = Math.min(Math.max(count, 1), 1000);

    const numbers = [];
    for (let i = 0; i < count; i++) {
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.push(rand);
    }

    state.insert(numbers.join('\n'));

  } catch (error) {
    state.postError("Format: 'max' or 'min max' or 'min max count'");
  }
}
