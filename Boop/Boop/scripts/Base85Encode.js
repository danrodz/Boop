/**
  {
    "api": 1,
    "name": "Base85 Encode",
    "description": "Encode text to Base85 (ASCII85)",
    "author": "Boop",
    "icon": "lock.rectangle",
    "tags": "base85,ascii85,encode,encoding"
  }
**/

function main(state) {
  try {
    const input = state.text;

    // Simple Base85 encoding (ASCII85)
    function encodeBase85(str) {
      const chars = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstu';
      let result = '<~';

      for (let i = 0; i < str.length; i += 4) {
        let value = 0;
        let count = 0;

        for (let j = 0; j < 4; j++) {
          value = value * 256;
          if (i + j < str.length) {
            value += str.charCodeAt(i + j);
            count++;
          }
        }

        // Encode to base85
        const encoded = [];
        for (let k = 0; k < 5; k++) {
          encoded.unshift(chars[value % 85]);
          value = Math.floor(value / 85);
        }

        result += encoded.slice(0, count + 1).join('');
      }

      result += '~>';
      return result;
    }

    state.text = encodeBase85(input);
  } catch (error) {
    state.postError("Error encoding Base85: " + error.message);
  }
}
