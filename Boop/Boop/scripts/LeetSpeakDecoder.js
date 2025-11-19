/**
  {
    "api": 1,
    "name": "Leet Speak Decoder",
    "description": "Decode l33t sp3ak to normal text",
    "author": "Boop",
    "icon": "textformat.abc",
    "tags": "leet,1337,decode,fun,internet"
  }
**/

function main(state) {
  try {
    const leet = state.text;

    const decodeMap = {
      '4': 'a',
      '3': 'e',
      '1': 'i',
      '0': 'o',
      '5': 's',
      '7': 't',
      '8': 'b',
      '9': 'g',
      '2': 'z'
    };

    let text = '';

    for (const char of leet) {
      if (decodeMap[char]) {
        text += decodeMap[char];
      } else {
        text += char;
      }
    }

    state.text = text;
  } catch (error) {
    state.postError("Error decoding leet speak: " + error.message);
  }
}
