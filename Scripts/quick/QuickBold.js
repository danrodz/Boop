/**
  {
    "api": 1,
    "name": "Quick Bold",
    "description": "Makes selection bold",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) { state.text = \`**\${state.text}**\`; }
