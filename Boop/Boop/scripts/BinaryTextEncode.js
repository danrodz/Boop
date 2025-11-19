/**
  {
    "api": 1,
    "name": "Binary Text Encode",
    "description": "Encode text as binary (8-bit ASCII)",
    "author": "Boop",
    "icon": "01.square",
    "tags": "binary,encode,ascii,bits"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const binary = [];

    for (const char of text) {
      const code = char.charCodeAt(0);
      const bin = code.toString(2).padStart(8, '0');
      binary.push(bin);
    }

    state.text = binary.join(' ');
  } catch (error) {
    state.postError("Error encoding to binary: " + error.message);
  }
}
