/**
  {
    "api": 1,
    "name": "Alternating Case",
    "description": "Alternates between uppercase and lowercase",
    "author": "Boop",
    "icon": "textformat",
    "tags": "alternating,case,spongebob,mocking"
  }
**/

function main(state) {
  let result = '';
  let upper = false;

  for (let char of state.text) {
    if (char.match(/[a-zA-Z]/)) {
      result += upper ? char.toUpperCase() : char.toLowerCase();
      upper = !upper;
    } else {
      result += char;
    }
  }

  state.text = result;
}
