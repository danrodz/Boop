/**
  {
    "api": 1,
    "name": "L33t Speak",
    "description": "Converts text to l33t speak (leet)",
    "author": "Boop",
    "icon": "keyboard",
    "tags": "leet,l33t,hacker,speak"
  }
**/

const LEET_MAP = {
  'a': '4', 'A': '4', 'e': '3', 'E': '3', 'i': '1', 'I': '1', 'o': '0', 'O': '0',
  't': '7', 'T': '7', 's': '5', 'S': '5', 'g': '9', 'G': '9', 'b': '8', 'B': '8',
  'l': '1', 'L': '1'
};

function main(state) {
  state.text = state.text.split('').map(char => LEET_MAP[char] || char).join('');
}
