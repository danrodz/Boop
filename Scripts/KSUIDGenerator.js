/**
  {
    "api": 1,
    "name": "Generate KSUID",
    "description": "Generate K-Sortable Unique Identifier",
    "author": "Boop",
    "icon": "key",
    "tags": "ksuid,id,generate,unique,sortable"
  }
**/

function main(state) {
  try {
    const EPOCH = 1400000000; // Custom epoch (May 13, 2014)
    const TIMESTAMP_LEN = 4;
    const PAYLOAD_LEN = 16;

    // Get timestamp (seconds since custom epoch)
    const timestamp = Math.floor(Date.now() / 1000) - EPOCH;

    // Generate random payload
    const payload = [];
    for (let i = 0; i < PAYLOAD_LEN; i++) {
      payload.push(Math.floor(Math.random() * 256));
    }

    // Combine timestamp and payload
    const bytes = [
      (timestamp >> 24) & 0xFF,
      (timestamp >> 16) & 0xFF,
      (timestamp >> 8) & 0xFF,
      timestamp & 0xFF,
      ...payload
    ];

    // Encode to base62
    const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    let num = BigInt(0);
    for (let byte of bytes) {
      num = num * BigInt(256) + BigInt(byte);
    }

    let encoded = '';
    while (num > 0) {
      const remainder = num % BigInt(62);
      encoded = ALPHABET[Number(remainder)] + encoded;
      num = num / BigInt(62);
    }

    // Pad to 27 characters
    while (encoded.length < 27) {
      encoded = '0' + encoded;
    }

    state.text = encoded;
  } catch (error) {
    state.postError("Failed to generate KSUID: " + error.message);
  }
}
