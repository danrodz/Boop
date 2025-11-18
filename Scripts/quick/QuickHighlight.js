/**
  {
    "api": 1,
    "name": "Quick Highlight",
    "description": "Highlights text",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) { state.text = \`==\${state.text}==\`; }
