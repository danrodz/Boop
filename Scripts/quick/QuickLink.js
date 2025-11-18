/**
  {
    "api": 1,
    "name": "Quick Link",
    "description": "Makes selection a link",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) { state.text = \`[\${state.text}](url)\`; }
