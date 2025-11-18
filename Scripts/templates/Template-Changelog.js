/**
  {
    "api": 1,
    "name": "Changelog Template",
    "description": "Creates changelog template",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) {
  const date = new Date().toISOString().split('T')[0];
  state.insert(\`# Changelog\n\n## [\${date}]\n\n### Added\n- \n\n### Changed\n- \n\n### Fixed\n- \`);
}
