/**
  {
    "api": 1,
    "name": "ASCII85 Encode",
    "description": "Encodes text to ASCII85 (also known as Base85)",
    "author": "Boop",
    "icon": "lock",
    "tags": "ascii85,base85,encode"
  }
**/

function ascii85Encode(data) {
  const bytes = new TextEncoder().encode(data);
  let result = '';

  for (let i = 0; i < bytes.length; i += 4) {
    let value = 0;
    let count = Math.min(4, bytes.length - i);

    for (let j = 0; j < count; j++) {
      value = (value << 8) | bytes[i + j];
    }

    if (count < 4) {
      value <<= (4 - count) * 8;
    }

    if (value === 0 && count === 4) {
      result += 'z';
    } else {
      let encoded = '';
      for (let j = 0; j < 5; j++) {
        encoded = String.fromCharCode(33 + (value % 85)) + encoded;
        value = Math.floor(value / 85);
      }
      result += encoded.slice(0, count + 1);
    }
  }

  return '<~' + result + '~>';
}

function main(state) {
  try {
    state.text = ascii85Encode(state.text);
  } catch (error) {
    state.postError("Failed to encode to ASCII85: " + error.message);
  }
}
