/**
  {
    "api": 1,
    "name": "Base32 Decode",
    "description": "Decodes Base32 text (RFC 4648)",
    "author": "Boop",
    "icon": "lock.open.fill",
    "tags": "base32,decode,rfc4648"
  }
**/

function main(state) {
  try {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const input = state.text.trim().toUpperCase().replace(/=+$/, '');
    let bits = 0;
    let value = 0;
    const output = [];

    for (let i = 0; i < input.length; i++) {
      const idx = alphabet.indexOf(input[i]);
      if (idx === -1) {
        state.postError(`Invalid Base32 character: ${input[i]}`);
        return;
      }

      value = (value << 5) | idx;
      bits += 5;

      if (bits >= 8) {
        output.push((value >>> (bits - 8)) & 255);
        bits -= 8;
      }
    }

    state.text = new TextDecoder().decode(new Uint8Array(output));
  } catch (error) {
    state.postError("Failed to decode Base32: " + error.message);
  }
}
