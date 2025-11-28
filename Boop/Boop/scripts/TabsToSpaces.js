/**
{
  "api": 1,
  "name": "Tabs to Spaces",
  "description": "Converts tabs to spaces (4 spaces)",
  "author": "Boop",
  "icon": "arrow.right",
  "tags": "tabs,spaces,convert"
}
**/

function main(state) {
  state.text = state.text.replace(/\t/g, '    ');
}
