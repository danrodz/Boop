/**
  {
    "api": 1,
    "name": "Reverse String",
    "description": "Reverses the entire string",
    "author": "Boop",
    "icon": "arrow.left.arrow.right",
    "tags": "reverse,string,text,flip"
  }
**/

function main(state) {
  // Handle Unicode properly with spread operator
  state.text = [...state.text].reverse().join('');
}
