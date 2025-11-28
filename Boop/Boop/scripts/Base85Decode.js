/**
  {
    "api": 1,
    "name": "Base85 Decode",
    "description": "Decode Base85 (ASCII85) to text",
    "author": "Boop",
    "icon": "lock.rectangle.on.rectangle",
    "tags": "base85,ascii85,decode,decoding"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    // Remove wrapper if present
    let data = input;
    if (data.startsWith('<~') && data.endsWith('~>')) {
      data = data.slice(2, -2);
    }

    function decodeBase85(str) {
      const chars = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstu';
      let result = '';

      for (let i = 0; i < str.length; i += 5) {
        let value = 0;
        let count = Math.min(5, str.length - i);

        for (let j = 0; j < count; j++) {
          const charCode = chars.indexOf(str[i + j]);
          if (charCode === -1) {
            throw new Error("Invalid Base85 character");
          }
          value = value * 85 + charCode;
        }

        // Decode to bytes
        const bytes = [];
        for (let k = 0; k < 4; k++) {
          bytes.unshift(value & 0xFF);
          value >>= 8;
        }

        result += String.fromCharCode(...bytes.slice(0, count - 1));
      }

      return result;
    }

    state.text = decodeBase85(data);
  } catch (error) {
    state.postError("Error decoding Base85: " + error.message);
  }
}
