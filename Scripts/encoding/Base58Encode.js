/**
  {
    "api": 1,
    "name": "Base58 Encode",
    "description": "Encodes text to Base58 (Bitcoin alphabet)",
    "author": "Boop",
    "icon": "lock",
    "tags": "base58,encode,bitcoin,crypto"
  }
**/

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

function base58Encode(buffer) {
  if (buffer.length === 0) return '';

  let digits = [0];
  for (let i = 0; i < buffer.length; i++) {
    let carry = buffer[i];
    for (let j = 0; j < digits.length; j++) {
      carry += digits[j] << 8;
      digits[j] = carry % 58;
      carry = (carry / 58) | 0;
    }
    while (carry > 0) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }

  let result = '';
  for (let i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) {
    result += BASE58_ALPHABET[0];
  }
  for (let i = digits.length - 1; i >= 0; i--) {
    result += BASE58_ALPHABET[digits[i]];
  }

  return result;
}

function main(state) {
  try {
    const input = state.text;
    const buffer = new TextEncoder().encode(input);
    state.text = base58Encode(buffer);
  } catch (error) {
    state.postError("Failed to encode to Base58: " + error.message);
  }
}
