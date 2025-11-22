/**
  {
    "api": 1,
    "name": "Expand Tabs (4 spaces)",
    "description": "Converts tabs to 4 spaces",
    "author": "Boop",
    "icon": "arrow.right.to.line",
    "tags": "tabs,spaces,expand,indent,4"
  }
**/

function main(state) {
  var count = (state.text.match(/\t/g) || []).length;
  state.text = state.text.replace(/\t/g, "    ");
  state.postInfo("Converted " + count + " tab(s) to 4 spaces each");
}
