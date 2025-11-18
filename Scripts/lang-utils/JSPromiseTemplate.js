/**
  {
    "api": 1,
    "name": "JS Promise Template",
    "description": "Creates Promise template",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) {
  state.text = \`new Promise((resolve, reject) => {
  \${state.text}
})\`;
}
