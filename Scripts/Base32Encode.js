/**
  {
    "api": 1,
    "name": "Base32 Encode",
    "description": "Encodes text to Base32 (RFC 4648)",
    "author": "Boop",
    "icon": "lock.fill",
    "tags": "base32,encode,rfc4648"
  }
**/

function main(state) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const input = new TextEncoder().encode(state.text);
  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < input.length; i++) {
    value = (value << 8) | input[i];
    bits += 8;

    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }

  // Add padding
  while (output.length % 8 !== 0) {
    output += '=';
  }

  state.text = output;
}
