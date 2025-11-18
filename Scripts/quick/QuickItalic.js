/**
  {
    "api": 1,
    "name": "Quick Italic",
    "description": "Makes selection italic",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) { state.text = \`*\${state.text}*\`; }
