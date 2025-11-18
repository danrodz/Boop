/**
  {
    "api": 1,
    "name": "Binary to Text",
    "description": "Converts binary (8-bit) to text",
    "author": "Boop",
    "icon": "01.circle",
    "tags": "binary,decode,text"
  }
**/

function main(state) {
  try {
    const binary = state.text.replace(/\s/g, '');
    if (!/^[01]+$/.test(binary)) {
      state.postError("Input must contain only 0s and 1s");
      return;
    }

    if (binary.length % 8 !== 0) {
      state.postError("Binary length must be a multiple of 8");
      return;
    }

    let result = '';
    for (let i = 0; i < binary.length; i += 8) {
      const byte = binary.substr(i, 8);
      result += String.fromCharCode(parseInt(byte, 2));
    }
    state.text = result;
  } catch (error) {
    state.postError("Failed to decode binary: " + error.message);
  }
}
