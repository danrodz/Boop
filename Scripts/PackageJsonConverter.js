/**
  {
    "api": 1,
    "name": "Package.json to Yarn/PNPM",
    "description": "Show equivalent Yarn/PNPM commands from package.json scripts",
    "author": "Boop",
    "icon": "cube.box",
    "tags": "package,json,yarn,pnpm,npm"
  }
**/

function main(state) {
  try {
    const pkg = JSON.parse(state.text);

    if (!pkg.scripts) {
      state.postError("No scripts found in package.json");
      return;
    }

    let result = '# NPM Scripts Conversion\n\n';

    for (let [name, script] of Object.entries(pkg.scripts)) {
      result += `## ${name}\n`;
      result += `npm run ${name}\n`;
      result += `yarn ${name}\n`;
      result += `pnpm ${name}\n\n`;
    }

    result += '# Install Dependencies\n';
    result += 'npm install\n';
    result += 'yarn install\n';
    result += 'pnpm install\n';

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to parse package.json: " + error.message);
  }
}
