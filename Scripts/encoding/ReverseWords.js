/**
  {
    "api": 1,
    "name": "Reverse Words",
    "description": "Reverses the order of words",
    "author": "Boop",
    "icon": "arrow.left.arrow.right",
    "tags": "reverse,words,flip"
  }
**/

function main(state) {
  state.text = state.text.split(/\s+/).reverse().join(' ');
}
