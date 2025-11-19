/**
  {
    "api": 1,
    "name": "README Template",
    "description": "Creates README template",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) {
  state.insert(\`# Project Name\n\n## Description\n\n## Installation\n\n## Usage\n\n## License\`);
}
