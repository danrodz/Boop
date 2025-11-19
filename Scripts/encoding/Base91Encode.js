/**
  {
    "api": 1,
    "name": "Base91 Encode",
    "description": "Encodes data to Base91 (efficient encoding)",
    "author": "Boop",
    "icon": "lock",
    "tags": "base91,encode"
  }
**/

const BASE91_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"';

function base91Encode(data) {
  const bytes = new TextEncoder().encode(data);
  let result = '';
  let ebq = 0;
  let en = 0;

  for (let i = 0; i < bytes.length; i++) {
    ebq |= bytes[i] << en;
    en += 8;

    if (en > 13) {
      let ev = ebq & 8191;

      if (ev > 88) {
        ebq >>= 13;
        en -= 13;
      } else {
        ev = ebq & 16383;
        ebq >>= 14;
        en -= 14;
      }

      result += BASE91_ALPHABET[ev % 91] + BASE91_ALPHABET[Math.floor(ev / 91)];
    }
  }

  if (en > 0) {
    result += BASE91_ALPHABET[ebq % 91];
    if (en > 7 || ebq > 90) {
      result += BASE91_ALPHABET[Math.floor(ebq / 91)];
    }
  }

  return result;
}

function main(state) {
  state.text = base91Encode(state.text);
}
