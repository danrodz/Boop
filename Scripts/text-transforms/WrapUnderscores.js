/**
  {
    "api": 1,
    "name": "Wrap in Underscores",
    "description": "Wraps text in __",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = \`__\${state.text}__\`; }
