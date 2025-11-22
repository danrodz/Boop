/**
  {
    "api": 1,
    "name": "Hex Decode",
    "description": "Decodes hexadecimal to text",
    "author": "Boop",
    "icon": "number.circle.fill",
    "tags": "hex,hexadecimal,decode"
  }
**/

function main(state) {
  try {
    const hex = state.text.trim().replace(/\s/g, '').replace(/^0x/i, '');

    if (!/^[0-9a-fA-F]*$/.test(hex)) {
      state.postError("Invalid hexadecimal characters");
      return;
    }

    if (hex.length % 2 !== 0) {
      state.postError("Hex string must have even length");
      return;
    }

    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }

    state.text = new TextDecoder().decode(bytes);
  } catch (error) {
    state.postError("Failed to decode hex: " + error.message);
  }
}
