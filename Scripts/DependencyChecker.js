/**
  {
    "api": 1,
    "name": "Check Dependency Versions",
    "description": "Check if dependencies in package.json follow best practices",
    "author": "Boop",
    "icon": "info",
    "tags": "dependencies,package,npm,version,check"
  }
**/

function main(state) {
  try {
    const pkg = JSON.parse(state.text);
    const issues = [];

    function checkDeps(deps, type) {
      if (!deps) return;

      Object.entries(deps).forEach(([name, version]) => {
        // Check for wildcards
        if (version === '*') {
          issues.push(`${type}: "${name}" uses wildcard version (*) - specify exact version`);
        }

        // Check for outdated caret/tilde
        if (version.startsWith('^') || version.startsWith('~')) {
          // This is actually good practice, just noting
        }

        // Check for git/http URLs
        if (version.startsWith('git') || version.startsWith('http')) {
          issues.push(`${type}: "${name}" uses ${version.startsWith('git') ? 'git' : 'http'} URL - consider using npm registry`);
        }

        // Check for local paths
        if (version.startsWith('file:') || version.startsWith('.')) {
          issues.push(`${type}: "${name}" uses local path - may cause issues in production`);
        }
      });
    }

    checkDeps(pkg.dependencies, 'dependencies');
    checkDeps(pkg.devDependencies, 'devDependencies');

    let output = 'Dependency Version Check\n\n';

    if (issues.length === 0) {
      output += '✅ All dependency versions look good!\n\n';
      output += 'Best practices:\n';
      output += '- Use ^ for minor updates\n';
      output += '- Use ~ for patch updates\n';
      output += '- Avoid wildcards (*)\n';
      output += '- Prefer npm registry over git URLs';
    } else {
      output += `⚠️  Found ${issues.length} potential issue(s):\n\n`;
      issues.forEach((issue, i) => {
        output += `${i + 1}. ${issue}\n`;
      });
    }

    state.text = output;
  } catch (error) {
    state.postError(`Invalid JSON: ${error.message}`);
  }
}
