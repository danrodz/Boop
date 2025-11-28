/**
  {
    "api": 1,
    "name": "Sort Lines Alphabetically",
    "description": "Sort lines in alphabetical order",
    "author": "Boop",
    "icon": "sort",
    "tags": "sort,alphabetical,lines,text,order"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const sorted = lines.sort((a, b) => a.localeCompare(b));

  state.text = sorted.join('\n');
  state.postInfo("Sorted lines alphabetically");
}
