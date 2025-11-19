/**
  {
    "api": 1,
    "name": "Zalgo Text (Minimal)",
    "description": "Creates minimal zalgo/glitch text effect",
    "author": "Boop",
    "icon": "waveform",
    "tags": "zalgo,glitch,unicode,combining"
  }
**/

const ZALGO_CHARS = [
  '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307',
  '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F'
];

function main(state) {
  let result = '';
  for (let char of state.text) {
    result += char;
    // Add 1-2 random combining characters
    const count = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < count; i++) {
      result += ZALGO_CHARS[Math.floor(Math.random() * ZALGO_CHARS.length)];
    }
  }
  state.text = result;
}
