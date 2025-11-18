/**
  {
    "api": 1,
    "name": "Base58 Decode",
    "description": "Decode Base58 to text (Bitcoin alphabet)",
    "author": "Boop",
    "icon": "lock.open",
    "tags": "base58,decode,bitcoin,crypto"
  }
**/

function main(state) {
  try {
    const encoded = state.text.trim();
    const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

    // Count leading '1's
    let leadingOnes = 0;
    for (let i = 0; i < encoded.length && encoded[i] === '1'; i++) {
      leadingOnes++;
    }

    // Convert from base58
    let num = BigInt(0);
    for (let char of encoded) {
      const digit = ALPHABET.indexOf(char);
      if (digit === -1) {
        state.postError("Invalid Base58 character: " + char);
        return;
      }
      num = num * BigInt(58) + BigInt(digit);
    }

    // Convert to bytes
    const bytes = [];
    while (num > 0) {
      bytes.unshift(Number(num % BigInt(256)));
      num = num / BigInt(256);
    }

    // Add leading zero bytes
    for (let i = 0; i < leadingOnes; i++) {
      bytes.unshift(0);
    }

    // Convert bytes to string
    let result = '';
    for (let byte of bytes) {
      result += String.fromCharCode(byte);
    }

    state.text = result;
  } catch (error) {
    state.postError("Failed to decode Base58: " + error.message);
  }
}
