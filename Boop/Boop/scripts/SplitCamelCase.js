/**
{
  "api": 1,
  "name": "Split CamelCase",
  "description": "Splits camelCase into separate words",
  "author": "Boop",
  "icon": "textformat",
  "tags": "camel,split,words"
}
**/

function main(state) {
  state.text = state.text.replace(/([a-z])([A-Z])/g, '$1 $2');
}
