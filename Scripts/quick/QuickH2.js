/**
  {
    "api": 1,
    "name": "Quick H2",
    "description": "Makes line H2 header",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) { state.text = \`## \${state.text}\`; }
