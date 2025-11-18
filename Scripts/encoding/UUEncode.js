/**
  {
    "api": 1,
    "name": "UUEncode",
    "description": "Encodes text using UUEncoding",
    "author": "Boop",
    "icon": "lock",
    "tags": "uuencode,encode,unix"
  }
**/

function uuencode(data, filename = 'file.txt') {
  const bytes = new TextEncoder().encode(data);
  let result = `begin 644 ${filename}\n`;

  for (let i = 0; i < bytes.length; i += 45) {
    const chunk = bytes.slice(i, i + 45);
    let line = String.fromCharCode(32 + chunk.length);

    for (let j = 0; j < chunk.length; j += 3) {
      let n = (chunk[j] << 16) | ((chunk[j + 1] || 0) << 8) | (chunk[j + 2] || 0);
      for (let k = 3; k >= 0; k--) {
        const c = (n >> (k * 6)) & 0x3f;
        line += String.fromCharCode(c === 0 ? 96 : c + 32);
      }
    }

    result += line + '\n';
  }

  result += '`\nend';
  return result;
}

function main(state) {
  state.text = uuencode(state.text);
}
