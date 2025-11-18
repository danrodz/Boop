/**
  {
    "api": 1,
    "name": "Keep Only Vowels",
    "description": "Keeps only vowels from text",
    "author": "Boop",
    "icon": "textformat.abc",
    "tags": "vowels,keep,filter"
  }
**/

function main(state) {
  state.text = state.text.replace(/[^aeiouAEIOU]/g, '');
}
