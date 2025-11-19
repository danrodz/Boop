/**
  {
    "api": 1,
    "name": "Base62 Encode",
    "description": "Encodes numbers to Base62 (0-9, A-Z, a-z)",
    "author": "Boop",
    "icon": "number",
    "tags": "base62,encode,number,url-shortener"
  }
**/

const BASE62_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function base62Encode(num) {
  if (num === 0n) return BASE62_ALPHABET[0];

  let result = '';
  let n = BigInt(num);
  while (n > 0n) {
    result = BASE62_ALPHABET[Number(n % 62n)] + result;
    n = n / 62n;
  }
  return result;
}

function main(state) {
  try {
    const input = state.text.trim();
    const num = BigInt(input);
    if (num < 0n) {
      state.postError("Base62 encoding requires non-negative integers");
      return;
    }
    state.text = base62Encode(num);
  } catch (error) {
    state.postError("Failed to encode to Base62. Input must be a valid integer.");
  }
}
