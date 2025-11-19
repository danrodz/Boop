/**
{
  "api": 1,
  "name": "Keep Only Numbers",
  "description": "Removes everything except numbers",
  "author": "Boop",
  "icon": "number",
  "tags": "numbers,keep,filter"
}
**/

function main(state) {
  state.text = state.text.replace(/[^\d]/g, '');
}
