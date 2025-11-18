/**
  {
    "api": 1,
    "name": "Base58 Decode",
    "description": "Decodes Base58 encoded text (Bitcoin alphabet)",
    "author": "Boop",
    "icon": "lock.open",
    "tags": "base58,decode,bitcoin,crypto"
  }
**/

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

function base58Decode(str) {
  if (str.length === 0) return new Uint8Array(0);

  let bytes = [0];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    let value = BASE58_ALPHABET.indexOf(char);
    if (value < 0) {
      throw new Error(`Invalid Base58 character: ${char}`);
    }

    let carry = value;
    for (let j = 0; j < bytes.length; j++) {
      carry += bytes[j] * 58;
      bytes[j] = carry & 0xff;
      carry >>= 8;
    }
    while (carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  for (let i = 0; str[i] === BASE58_ALPHABET[0] && i < str.length - 1; i++) {
    bytes.push(0);
  }

  return new Uint8Array(bytes.reverse());
}

function main(state) {
  try {
    const input = state.text;
    const decoded = base58Decode(input.trim());
    state.text = new TextDecoder().decode(decoded);
  } catch (error) {
    state.postError("Failed to decode Base58: " + error.message);
  }
}
