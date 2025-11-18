/**
  {
    "api": 1,
    "name": "Small Caps Text",
    "description": "Converts text to small caps Unicode characters",
    "author": "Boop",
    "icon": "textformat.size.smaller",
    "tags": "smallcaps,unicode,fancy,font"
  }
**/

const SMALL_CAPS = {
  'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ',
  'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ',
  'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
  'y': 'ʏ', 'z': 'ᴢ'
};

function main(state) {
  state.text = state.text.toLowerCase().split('').map(char => SMALL_CAPS[char] || char).join('');
}
