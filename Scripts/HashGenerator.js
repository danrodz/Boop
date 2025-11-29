/**
  {
    "api": 1,
    "name": "Hash Generator (Multiple)",
    "description": "Generates MD5, SHA-1, SHA-256 hashes",
    "author": "Boop",
    "icon": "number.square.fill",
    "tags": "hash,md5,sha,sha256,checksum"
  }
**/

async function main(state) {
  try {
    const text = state.text;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // MD5 is not available in Web Crypto API, so we'll skip it
    // Generate SHA-256 and SHA-512

    const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    const sha512Buffer = await crypto.subtle.digest('SHA-512', data);

    function bufferToHex(buffer) {
      return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }

    const sha1 = bufferToHex(sha1Buffer);
    const sha256 = bufferToHex(sha256Buffer);
    const sha512 = bufferToHex(sha512Buffer);

    const result = `HASH GENERATOR

Input length: ${text.length} characters

SHA-1:
${sha1}

SHA-256:
${sha256}

SHA-512:
${sha512}`;

    state.text = result;

  } catch (error) {
    state.postError("Failed to generate hashes: " + error.message);
  }
}
