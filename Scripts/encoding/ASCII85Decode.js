/**
  {
    "api": 1,
    "name": "ASCII85 Decode",
    "description": "Decodes ASCII85 (Base85) encoded text",
    "author": "Boop",
    "icon": "lock.open",
    "tags": "ascii85,base85,decode"
  }
**/

function ascii85Decode(data) {
  data = data.trim();
  if (data.startsWith('<~')) data = data.slice(2);
  if (data.endsWith('~>')) data = data.slice(0, -2);

  let result = [];

  for (let i = 0; i < data.length;) {
    if (data[i] === 'z') {
      result.push(0, 0, 0, 0);
      i++;
      continue;
    }

    let value = 0;
    let count = Math.min(5, data.length - i);

    for (let j = 0; j < count; j++) {
      value = value * 85 + (data.charCodeAt(i + j) - 33);
    }

    if (count < 5) {
      for (let j = count; j < 5; j++) {
        value = value * 85 + 84;
      }
    }

    for (let j = 3; j >= 0; j--) {
      if (j < count - 1) {
        result.push((value >> (j * 8)) & 0xFF);
      }
    }

    i += count;
  }

  return new TextDecoder().decode(new Uint8Array(result));
}

function main(state) {
  try {
    state.text = ascii85Decode(state.text);
  } catch (error) {
    state.postError("Failed to decode ASCII85: " + error.message);
  }
}
