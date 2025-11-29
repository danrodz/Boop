/**
  {
    "api": 1,
    "name": "Sort Lines Reverse",
    "description": "Sorts lines in reverse alphabetical order",
    "author": "Boop",
    "icon": "arrow.down",
    "tags": "sort,lines,reverse,descending,order"
  }
**/

function main(state) {
  var lines = state.text.split("\n");
  lines.sort(function(a, b) { return b.localeCompare(a); });
  state.text = lines.join("\n");
  state.postInfo("Sorted " + lines.length + " lines in reverse order");
}
