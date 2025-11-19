/**
  {
    "api": 1,
    "name": "Binary Text Decode",
    "description": "Decode binary (8-bit ASCII) to text",
    "author": "Boop",
    "icon": "01.circle",
    "tags": "binary,decode,ascii,bits"
  }
**/

function main(state) {
  try {
    const binary = state.text.trim().split(/\s+/);
    let text = '';

    for (const bin of binary) {
      // Remove non-binary characters
      const clean = bin.replace(/[^01]/g, '');

      if (clean.length === 0) continue;

      const code = parseInt(clean, 2);
      text += String.fromCharCode(code);
    }

    state.text = text;
  } catch (error) {
    state.postError("Error decoding binary: " + error.message);
  }
}
