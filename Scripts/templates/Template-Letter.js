/**
  {
    "api": 1,
    "name": "Letter Template",
    "description": "Creates letter template",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) {
  const date = new Date().toLocaleDateString();
  state.insert(\`\${date}\n\nDear [Name],\n\n\n\nSincerely,\n[Your Name]\`);
}
