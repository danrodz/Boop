/**
  {
    "api": 1,
    "name": "Quick Strikethrough",
    "description": "Adds strikethrough",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) { state.text = \`~~\${state.text}~~\`; }
