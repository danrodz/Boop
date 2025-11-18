/**
  {
    "api": 1,
    "name": "Reverse Text",
    "description": "Reverses the entire text",
    "author": "Boop",
    "icon": "arrow.left.arrow.right",
    "tags": "reverse,text,flip"
  }
**/

function main(state) {
  state.text = state.text.split('').reverse().join('');
}
