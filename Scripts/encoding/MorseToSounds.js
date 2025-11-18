/**
  {
    "api": 1,
    "name": "Morse to Sounds",
    "description": "Converts Morse code to DIT DAH representation",
    "author": "Boop",
    "icon": "speaker.wave.2",
    "tags": "morse,sounds,dit,dah"
  }
**/

function main(state) {
  const result = state.text
    .replace(/\./g, 'DIT')
    .replace(/-/g, 'DAH')
    .replace(/\s+/g, ' ');
  state.text = result;
}
