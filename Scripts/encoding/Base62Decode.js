/**
  {
    "api": 1,
    "name": "Base62 Decode",
    "description": "Decodes Base62 encoded numbers to decimal",
    "author": "Boop",
    "icon": "number",
    "tags": "base62,decode,number,url-shortener"
  }
**/

const BASE62_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function base62Decode(str) {
  let result = 0n;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const value = BASE62_ALPHABET.indexOf(char);
    if (value < 0) {
      throw new Error(`Invalid Base62 character: ${char}`);
    }
    result = result * 62n + BigInt(value);
  }
  return result;
}

function main(state) {
  try {
    const input = state.text.trim();
    const num = base62Decode(input);
    state.text = num.toString();
  } catch (error) {
    state.postError("Failed to decode Base62: " + error.message);
  }
}
