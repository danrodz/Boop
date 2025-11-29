/**
  {
    "api": 1,
    "name": "Sort Lines Alphabetically",
    "description": "Sorts lines in alphabetical order",
    "author": "Boop",
    "icon": "sort",
    "tags": "sort,lines,alphabetical,alpha,order"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  lines.sort((a, b) => a.localeCompare(b));
  state.text = lines.join('\n');
  state.postInfo(`Sorted ${lines.length} lines`);
}
