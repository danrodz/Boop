/**
  {
    "api": 1,
    "name": "Wrap in Brackets",
    "description": "Wraps text in []",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = \`[\${state.text}]\`; }
