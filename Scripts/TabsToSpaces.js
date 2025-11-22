/**
  {
    "api": 1,
    "name": "Tabs to Spaces",
    "description": "Converts tabs to spaces (2 spaces per tab)",
    "author": "Boop",
    "icon": "arrow.right.arrow.left",
    "tags": "tabs,spaces,convert,indent,whitespace"
  }
**/

function main(state) {
  const tabCount = (state.text.match(/\t/g) || []).length;
  state.text = state.text.replace(/\t/g, '  ');
  state.postInfo(`Converted ${tabCount} tab(s) to spaces`);
}
