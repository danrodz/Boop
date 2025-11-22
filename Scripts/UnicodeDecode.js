/**
  {
    "api": 1,
    "name": "Unicode Unescape",
    "description": "Converts \\uXXXX escapes to actual characters",
    "author": "Boop",
    "icon": "globe",
    "tags": "unicode,unescape,decode,\\u,convert"
  }
**/

function main(state) {
  state.text = state.text.replace(/\\u([0-9a-fA-F]{4})/g, function(_, hex) {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  state.postInfo("Unicode escapes decoded");
}
