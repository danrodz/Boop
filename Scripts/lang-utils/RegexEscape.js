/**
  {
    "api": 1,
    "name": "Escape Regex Special Chars",
    "description": "Escapes regex special characters",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) {
  state.text = state.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
