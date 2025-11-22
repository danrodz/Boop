/**
  {
    "api": 1,
    "name": "Morse Code Encode",
    "description": "Converts text to Morse code",
    "author": "Boop",
    "icon": "waveform",
    "tags": "morse,code,encode,dots,dashes"
  }
**/

function main(state) {
  const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
    '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
  };
  
  const result = state.text
    .toUpperCase()
    .split('')
    .map(char => {
      if (char === ' ') return '/';
      return morseCode[char] || '';
    })
    .filter(code => code !== '')
    .join(' ');
  
  state.text = result;
  state.postInfo("Encoded to Morse code");
}
