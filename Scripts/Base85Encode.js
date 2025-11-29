/**
  {
    "api": 1,
    "name": "Base85 Encode",
    "description": "Encode text to Base85 (Ascii85)",
    "author": "Boop",
    "icon": "lock",
    "tags": "base85,ascii85,encode"
  }
**/

function main(state) {
  try {
    const text = state.text;
    let result = '';

    // Convert to bytes
    const bytes = [];
    for (let i = 0; i < text.length; i++) {
      bytes.push(text.charCodeAt(i));
    }

    // Process in groups of 4 bytes
    for (let i = 0; i < bytes.length; i += 4) {
      const group = bytes.slice(i, i + 4);

      // Pad if necessary
      while (group.length < 4) {
        group.push(0);
      }

      // Convert 4 bytes to 32-bit number
      let value = (group[0] << 24) | (group[1] << 16) | (group[2] << 8) | group[3];

      // Special case: all zeros
      if (value === 0 && i + 4 <= bytes.length) {
        result += 'z';
        continue;
      }

      // Convert to base85
      const encoded = [];
      for (let j = 0; j < 5; j++) {
        encoded.unshift(String.fromCharCode(33 + (value % 85)));
        value = Math.floor(value / 85);
      }

      result += encoded.join('');
    }

    // Trim padding if needed
    const padding = (4 - (bytes.length % 4)) % 4;
    if (padding > 0) {
      result = result.slice(0, -padding);
    }

    state.text = result;
  } catch (error) {
    state.postError("Failed to encode Base85: " + error.message);
  }
}
