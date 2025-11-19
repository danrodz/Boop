/**
  {
    "api": 1,
    "name": "Class Template",
    "description": "Creates class template",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) {
  state.insert(\`class ClassName {\n  constructor() {\n    // initialization\n  }\n\n  method() {\n    // implementation\n  }\n}\`);
}
