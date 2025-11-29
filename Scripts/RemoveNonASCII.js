/**
  {
    "api": 1,
    "name": "Remove Non-ASCII",
    "description": "Removes all non-ASCII characters",
    "author": "Boop",
    "icon": "textformat.abc",
    "tags": "ascii,remove,non-ascii,clean,unicode"
  }
**/

function main(state) {
  var original = state.text.length;
  state.text = state.text.replace(/[^\x00-\x7F]/g, "");
  var removed = original - state.text.length;
  state.postInfo("Removed " + removed + " non-ASCII character(s)");
}
