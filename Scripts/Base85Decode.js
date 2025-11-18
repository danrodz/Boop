/**
  {
    "api": 1,
    "name": "Base85 Decode",
    "description": "Decode Base85 (Ascii85) to text",
    "author": "Boop",
    "icon": "lock.open",
    "tags": "base85,ascii85,decode"
  }
**/

function main(state) {
  try {
    const encoded = state.text.trim();
    let result = '';
    let i = 0;

    while (i < encoded.length) {
      // Handle 'z' shorthand for zeros
      if (encoded[i] === 'z') {
        result += '\x00\x00\x00\x00';
        i++;
        continue;
      }

      // Get 5 characters
      const group = encoded.substr(i, 5);
      i += 5;

      // Convert from base85
      let value = 0;
      for (let j = 0; j < group.length; j++) {
        value = value * 85 + (group.charCodeAt(j) - 33);
      }

      // Convert to 4 bytes
      const bytes = [
        (value >> 24) & 0xFF,
        (value >> 16) & 0xFF,
        (value >> 8) & 0xFF,
        value & 0xFF
      ];

      for (let byte of bytes) {
        result += String.fromCharCode(byte);
      }
    }

    state.text = result;
  } catch (error) {
    state.postError("Failed to decode Base85: " + error.message);
  }
}
