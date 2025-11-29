/**
  {
    "api": 1,
    "name": "NATO Phonetic Alphabet",
    "description": "Converts text to NATO phonetic alphabet",
    "author": "Boop",
    "icon": "mic",
    "tags": "nato,phonetic,alphabet,military,spelling"
  }
**/

function main(state) {
  const nato = {
    'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
    'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliet',
    'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
    'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
    'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
    'Z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three',
    '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
  };
  
  const result = state.text
    .toUpperCase()
    .split('')
    .map(char => {
      if (char === ' ') return '\n[space]\n';
      return nato[char] || char;
    })
    .join(' ');
  
  state.text = result;
  state.postInfo("Converted to NATO phonetic alphabet");
}
