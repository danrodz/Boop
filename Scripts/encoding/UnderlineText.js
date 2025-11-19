/**
  {
    "api": 1,
    "name": "Underline Text",
    "description": "Adds underline to text using Unicode combining character",
    "author": "Boop",
    "icon": "underline",
    "tags": "underline,unicode,combining"
  }
**/

function main(state) {
  const UNDERLINE = '\u0332';
  state.text = state.text.split('').join(UNDERLINE) + UNDERLINE;
}
