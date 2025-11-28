/**
{
  "api": 1,
  "name": "Windows to Unix Line Endings",
  "description": "Converts CRLF to LF",
  "author": "Boop",
  "icon": "arrow.right",
  "tags": "line,endings,lf,unix"
}
**/

function main(state) {
  state.text = state.text.replace(/\r\n/g, '\n');
}
