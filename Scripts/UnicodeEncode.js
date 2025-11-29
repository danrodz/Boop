/**
  {
    "api": 1,
    "name": "Unicode Escape",
    "description": "Converts non-ASCII characters to \\uXXXX escapes",
    "author": "Boop",
    "icon": "globe",
    "tags": "unicode,escape,encode,\\u,convert"
  }
**/

function main(state) {
  var result = "";
  for (var i = 0; i < state.text.length; i++) {
    var code = state.text.charCodeAt(i);
    if (code > 127) {
      result += "\\u" + ("0000" + code.toString(16)).slice(-4);
    } else {
      result += state.text[i];
    }
  }
  state.text = result;
  state.postInfo("Non-ASCII characters escaped");
}
