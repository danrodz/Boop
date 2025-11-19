/**
  {
    "api": 1,
    "name": "TODO List Template",
    "description": "Creates TODO template",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) {
  state.insert(\`# TODO\n\n- [ ] \n- [ ] \n- [ ] \`);
}
