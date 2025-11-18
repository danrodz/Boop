/**
  {
    "api": 1,
    "name": "Python f-string",
    "description": "Converts to Python f-string",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) { state.text = \`f"\${state.text}"\`; }
