/**
  {
    "api": 1,
    "name": "Remove Vowels",
    "description": "Removes all vowels from text",
    "author": "Boop",
    "icon": "textformat.abc",
    "tags": "vowels,remove,filter"
  }
**/

function main(state) {
  state.text = state.text.replace(/[aeiouAEIOU]/g, '');
}
