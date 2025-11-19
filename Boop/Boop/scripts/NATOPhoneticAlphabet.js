/**
  {
    "api": 1,
    "name": "NATO Phonetic Alphabet",
    "description": "Convert text to NATO phonetic alphabet",
    "author": "Boop",
    "icon": "antenna.radiowaves.left.and.right",
    "tags": "nato,phonetic,alphabet,military,radio"
  }
**/

function main(state) {
  try {
    const text = state.text.toUpperCase();

    const nato = {
      'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
      'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
      'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
      'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
      'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
      'Z': 'Zulu',
      '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
      '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
    };

    const result = [];

    for (const char of text) {
      if (nato[char]) {
        result.push(nato[char]);
      } else if (char === ' ') {
        result.push('(space)');
      } else if (char.match(/[a-zA-Z0-9]/)) {
        result.push(char);
      }
    }

    state.text = result.join('-');
  } catch (error) {
    state.postError("Error converting to NATO phonetic: " + error.message);
  }
}
