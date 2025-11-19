/**
  {
    "api": 1,
    "name": "Quick H3",
    "description": "Makes line H3 header",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) { state.text = \`### \${state.text}\`; }
