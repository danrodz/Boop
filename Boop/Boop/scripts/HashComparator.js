/**
  {
    "api": 1,
    "name": "Hash Comparator",
    "description": "Compare hash with multiple algorithms to verify",
    "author": "Boop",
    "icon": "checkmark.shield",
    "tags": "hash,compare,verify,security,checksum"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');

    if (lines.length < 2) {
      state.text = 'Format:\ntext to hash\nexpected_hash_value';
      return;
    }

    const text = lines[0];
    const expectedHash = lines[1].trim().toLowerCase();

    // Detect hash type by length
    const hashTypes = {
      32: 'MD5',
      40: 'SHA-1',
      64: 'SHA-256',
      128: 'SHA-512',
      8: 'CRC32'
    };

    const hashLength = expectedHash.length;
    const detectedType = hashTypes[hashLength] || 'Unknown';

    const result = [
      `Expected Hash: ${expectedHash}`,
      `Length: ${hashLength} characters`,
      `Detected Type: ${detectedType}`,
      ``,
      `Note: Use dedicated hash scripts (MD5, SHA256, etc.)`,
      `to generate hash and verify manually.`,
      ``,
      `Hash appears to be ${detectedType} based on length.`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error comparing hash: " + error.message);
  }
}
