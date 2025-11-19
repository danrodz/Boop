/**
  {
    "api": 1,
    "name": "Quick H1",
    "description": "Makes line H1 header",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) { state.text = \`# \${state.text}\`; }
