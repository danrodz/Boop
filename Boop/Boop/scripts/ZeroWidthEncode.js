/**
{
  "api": 1,
  "name": "Zero-Width Encode",
  "description": "Encodes text using zero-width characters",
  "author": "Boop",
  "icon": "eye.slash",
  "tags": "zero-width,encode,steganography,invisible"
}
**/

function main(state) {
  const zero = '\u200B';
  const zeroNonJoiner = '\u200C';
  
  let result = '';
  for (let i = 0; i < state.text.length; i++) {
    const code = state.text.charCodeAt(i);
    const binary = code.toString(2).padStart(16, '0');
    
    for (const bit of binary) {
      result += bit === '0' ? zero : zeroNonJoiner;
    }
  }
  
  state.text = result;
}
