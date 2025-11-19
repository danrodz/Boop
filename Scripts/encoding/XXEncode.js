/**
  {
    "api": 1,
    "name": "XXEncode",
    "description": "Encodes text using XXEncoding",
    "author": "Boop",
    "icon": "lock",
    "tags": "xxencode,encode"
  }
**/

const XXENCODE_TABLE = '+-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function xxencode(data, filename = 'file.txt') {
  const bytes = new TextEncoder().encode(data);
  let result = `begin 644 ${filename}\n`;

  for (let i = 0; i < bytes.length; i += 45) {
    const chunk = bytes.slice(i, i + 45);
    let line = XXENCODE_TABLE[chunk.length];

    for (let j = 0; j < chunk.length; j += 3) {
      let n = (chunk[j] << 16) | ((chunk[j + 1] || 0) << 8) | (chunk[j + 2] || 0);
      for (let k = 3; k >= 0; k--) {
        line += XXENCODE_TABLE[(n >> (k * 6)) & 0x3f];
      }
    }

    result += line + '\n';
  }

  result += XXENCODE_TABLE[0] + '\nend';
  return result;
}

function main(state) {
  state.text = xxencode(state.text);
}
