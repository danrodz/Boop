/**
  {
    "api": 1,
    "name": "Base58 Encode",
    "description": "Encode text to Base58 (Bitcoin alphabet)",
    "author": "Boop",
    "icon": "lock",
    "tags": "base58,encode,bitcoin,crypto"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

    // Convert string to bytes
    const bytes = [];
    for (let i = 0; i < text.length; i++) {
      bytes.push(text.charCodeAt(i));
    }

    // Count leading zeros
    let leadingZeros = 0;
    for (let i = 0; i < bytes.length && bytes[i] === 0; i++) {
      leadingZeros++;
    }

    // Convert to base58
    let num = BigInt(0);
    for (let byte of bytes) {
      num = num * BigInt(256) + BigInt(byte);
    }

    let encoded = '';
    while (num > 0) {
      const remainder = num % BigInt(58);
      num = num / BigInt(58);
      encoded = ALPHABET[Number(remainder)] + encoded;
    }

    // Add '1' for each leading zero byte
    encoded = '1'.repeat(leadingZeros) + encoded;

    state.text = encoded || '1';
  } catch (error) {
    state.postError("Failed to encode Base58: " + error.message);
  }
}
