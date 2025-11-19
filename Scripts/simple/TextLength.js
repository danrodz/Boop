/**
  {
    "api": 1,
    "name": "Get Text Length",
    "description": "Returns length of text",
    "author": "Boop",
    "icon": "star",
    "tags": "utility"
  }
**/

function main(state) { state.text = \`Length: \${state.text.length}\`; }
