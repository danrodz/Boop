/**
  {
    "api": 1,
    "name": "Strip ANSI Codes",
    "description": "Removes ANSI escape sequences from terminal output",
    "author": "Boop",
    "icon": "terminal",
    "tags": "ansi,escape,terminal,color,strip,clean"
  }
**/

function main(state) {
  var ansiPattern = /\x1b\[[0-9;]*[a-zA-Z]|\x1b\].*?\x07/g;
  var cleaned = state.text.replace(ansiPattern, "");
  var removed = state.text.length - cleaned.length;
  state.text = cleaned;
  state.postInfo("Removed " + removed + " ANSI character(s)");
}
