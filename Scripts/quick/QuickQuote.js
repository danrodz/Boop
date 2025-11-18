/**
  {
    "api": 1,
    "name": "Quick Quote",
    "description": "Makes selection blockquote",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) { state.text = \`> \${state.text}\`; }
