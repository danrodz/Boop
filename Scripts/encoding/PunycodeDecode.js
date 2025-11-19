/**
  {
    "api": 1,
    "name": "Punycode Decode",
    "description": "Decodes Punycode (IDN) to Unicode",
    "author": "Boop",
    "icon": "globe",
    "tags": "punycode,decode,idn,unicode,domain"
  }
**/

function punycodeDecode(input) {
  const base = 36;
  const tmin = 1;
  const tmax = 26;
  const skew = 38;
  const damp = 700;
  const initialBias = 72;
  const initialN = 128;

  let n = initialN;
  let i = 0;
  let bias = initialBias;
  let output = [];

  let basic = input.lastIndexOf('-');
  if (basic < 0) basic = 0;

  for (let j = 0; j < basic; j++) {
    output.push(input.charCodeAt(j));
  }

  for (let index = basic > 0 ? basic + 1 : 0; index < input.length;) {
    let oldi = i;
    let w = 1;

    for (let k = base; ; k += base) {
      if (index >= input.length) throw new Error('Invalid Punycode');

      const c = input.charCodeAt(index++);
      const digit = c - 48 < 10 ? c - 22 : c - 65 < 26 ? c - 65 : c - 97 < 26 ? c - 97 : base;

      if (digit >= base) throw new Error('Invalid Punycode');

      i += digit * w;
      const t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;

      if (digit < t) break;
      w *= base - t;
    }

    bias = Math.floor((i - oldi) / (oldi === 0 ? damp : 2));
    n += Math.floor(i / (output.length + 1));
    i %= output.length + 1;

    output.splice(i++, 0, n);
  }

  return String.fromCodePoint(...output);
}

function main(state) {
  try {
    let input = state.text.trim();
    if (input.startsWith('xn--')) {
      input = input.substring(4);
    }
    state.text = punycodeDecode(input);
  } catch (error) {
    state.postError("Failed to decode Punycode: " + error.message);
  }
}
