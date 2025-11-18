/**
{
  "api": 1,
  "name": "Remove Accents",
  "description": "Removes accents and diacritics from text",
  "author": "Boop",
  "icon": "textformat",
  "tags": "accent,diacritic,normalize,ascii"
}
**/

function main(state) {
  state.text = state.text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
