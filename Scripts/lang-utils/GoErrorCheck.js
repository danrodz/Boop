/**
  {
    "api": 1,
    "name": "Go Error Check",
    "description": "Creates Go error check",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) {
  state.text = \`if err != nil {
  return err
}\`;
}
