/**
{
  "api": 1,
  "name": "Unix to Windows Line Endings",
  "description": "Converts LF to CRLF",
  "author": "Boop",
  "icon": "arrow.right",
  "tags": "line,endings,crlf,windows"
}
**/

function main(state) {
  state.text = state.text.replace(/\n/g, '\r\n');
}
