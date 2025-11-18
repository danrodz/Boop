/**
  {
    "api": 1,
    "name": "Strikethrough Text",
    "description": "Adds strikethrough to text using Unicode combining character",
    "author": "Boop",
    "icon": "strikethrough",
    "tags": "strikethrough,unicode,combining"
  }
**/

function main(state) {
  const STRIKETHROUGH = '\u0336';
  state.text = state.text.split('').join(STRIKETHROUGH) + STRIKETHROUGH;
}
