/**
  {
    "api": 1,
    "name": "Morse Code Decode",
    "description": "Converts Morse code to text",
    "author": "Boop",
    "icon": "waveform",
    "tags": "morse,code,decode,dots,dashes"
  }
**/

function main(state) {
  const morseDecode = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
    '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
    '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
    '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
    '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
    '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
    '---..': '8', '----.': '9', '.-.-.-': '.', '--..--': ',', '..--..': '?',
    '.----.': "'", '-.-.--': '!', '-..-.': '/', '-.--.': '(', '-.--.-': ')',
    '.-...': '&', '---...': ':', '-.-.-.': ';', '-...-': '=', '.-.-.': '+',
    '-....-': '-', '..--.-': '_', '.-..-.': '"', '...-..-': '$', '.--.-.': '@'
  };
  
  const words = state.text.split(/\s*\/\s*/);
  const result = words.map(word => {
    return word.split(/\s+/).map(code => morseDecode[code] || '?').join('');
  }).join(' ');
  
  state.text = result;
  state.postInfo("Decoded from Morse code");
}
