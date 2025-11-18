/**
  {
    "api": 1,
    "name": "Function Template",
    "description": "Creates function template",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) {
  state.insert(\`function name(params) {\n  // implementation\n  return result;\n}\`);
}
