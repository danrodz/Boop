/**
  {
    "api": 1,
    "name": "Wrap in Double Quotes",
    "description": "Wraps text in double quotes",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) { state.text = \`"\${state.text}"\`; }
