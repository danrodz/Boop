/**
  {
    "api": 1,
    "name": "UUDecode",
    "description": "Decodes UUEncoded text",
    "author": "Boop",
    "icon": "lock.open",
    "tags": "uudecode,decode,unix"
  }
**/

function uudecode(data) {
  const lines = data.trim().split('\n');
  let result = [];

  for (let i = 1; i < lines.length - 1; i++) {
    const line = lines[i];
    if (line === '`') break;

    const length = line.charCodeAt(0) - 32;
    if (length === 0) continue;

    for (let j = 1; j < line.length; j += 4) {
      let n = 0;
      for (let k = 0; k < 4 && j + k < line.length; k++) {
        const c = line.charCodeAt(j + k);
        const val = c === 96 ? 0 : c - 32;
        n |= val << ((3 - k) * 6);
      }

      for (let k = 2; k >= 0; k--) {
        if (result.length < length) {
          result.push((n >> (k * 8)) & 0xff);
        }
      }
    }
  }

  return new TextDecoder().decode(new Uint8Array(result));
}

function main(state) {
  try {
    state.text = uudecode(state.text);
  } catch (error) {
    state.postError("Failed to decode UUEncoded text: " + error.message);
  }
}
