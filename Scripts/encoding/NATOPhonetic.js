/**
  {
    "api": 1,
    "name": "NATO Phonetic Alphabet",
    "description": "Converts text to NATO phonetic alphabet",
    "author": "Boop",
    "icon": "speaker.wave.3",
    "tags": "nato,phonetic,military,alphabet"
  }
**/

const NATO = {
  'A': 'Alfa', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
  'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
  'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
  'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
  'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
  'Z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
  '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
};

function main(state) {
  const text = state.text.toUpperCase();
  const result = text.split('').map(char => {
    if (NATO[char]) return NATO[char];
    if (char === ' ') return '(space)';
    return char;
  }).join(' ');
  state.text = result;
}
