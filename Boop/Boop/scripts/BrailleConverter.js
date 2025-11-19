/**
  {
    "api": 1,
    "name": "Braille Converter",
    "description": "Convert text to Braille Unicode characters",
    "author": "Boop",
    "icon": "hand.point.up.braille",
    "tags": "braille,accessibility,unicode,convert"
  }
**/

function main(state) {
  try {
    const text = state.text.toLowerCase();

    const brailleMap = {
      'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓',
      'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
      'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
      'y': '⠽', 'z': '⠵',
      '0': '⠚', '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑', '6': '⠋', '7': '⠛',
      '8': '⠓', '9': '⠊',
      ' ': ' ', '.': '⠲', ',': '⠂', '!': '⠖', '?': '⠦', ';': '⠆', ':': '⠒', '-': '⠤'
    };

    let braille = '';
    for (const char of text) {
      braille += brailleMap[char] || char;
    }

    state.text = braille;
    state.postInfo("Converted to Braille (simplified)");
  } catch (error) {
    state.postError("Error converting to Braille: " + error.message);
  }
}
