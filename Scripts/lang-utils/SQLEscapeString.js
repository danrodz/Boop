/**
  {
    "api": 1,
    "name": "SQL Escape String",
    "description": "Escapes SQL string",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) { state.text = state.text.replace(/'/g, "''"); }
