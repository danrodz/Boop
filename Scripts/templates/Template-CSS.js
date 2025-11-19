/**
  {
    "api": 1,
    "name": "CSS Reset Template",
    "description": "Creates CSS reset template",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) {
  state.insert(\`* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\`);
}
