/**
  {
    "api": 1,
    "name": "Leet Speak Encoder",
    "description": "Convert text to l33t sp3ak",
    "author": "Boop",
    "icon": "number",
    "tags": "leet,1337,encode,fun,internet"
  }
**/

function main(state) {
  try {
    const text = state.text;

    const leetMap = {
      'a': '4', 'A': '4',
      'e': '3', 'E': '3',
      'i': '1', 'I': '1',
      'o': '0', 'O': '0',
      's': '5', 'S': '5',
      't': '7', 'T': '7',
      'b': '8', 'B': '8',
      'g': '9', 'G': '9',
      'l': '1', 'L': '1',
      'z': '2', 'Z': '2'
    };

    let leet = '';

    for (const char of text) {
      // Random chance to convert
      if (leetMap[char] && Math.random() > 0.3) {
        leet += leetMap[char];
      } else {
        leet += char;
      }
    }

    state.text = leet;
  } catch (error) {
    state.postError("Error encoding to leet speak: " + error.message);
  }
}
