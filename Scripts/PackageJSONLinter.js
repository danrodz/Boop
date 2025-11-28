/**
  {
    "api": 1,
    "name": "Lint package.json",
    "description": "Check package.json for common issues and best practices",
    "author": "Boop",
    "icon": "info",
    "tags": "package,json,lint,npm,node"
  }
**/

function main(state) {
  try {
    const pkg = JSON.parse(state.text);
    const issues = [];
    const warnings = [];

    // Required fields
    if (!pkg.name) issues.push('Missing "name" field');
    if (!pkg.version) issues.push('Missing "version" field');

    // Name validation
    if (pkg.name && !/^[a-z0-9-_.]+$/.test(pkg.name)) {
      issues.push('Package name should only contain lowercase letters, numbers, hyphens, and underscores');
    }

    // Version validation
    if (pkg.version && !/^\d+\.\d+\.\d+/.test(pkg.version)) {
      warnings.push('Version should follow semantic versioning (x.y.z)');
    }

    // Best practices
    if (!pkg.description) warnings.push('Missing "description" field');
    if (!pkg.author) warnings.push('Missing "author" field');
    if (!pkg.license) warnings.push('Missing "license" field');
    if (!pkg.repository) warnings.push('Missing "repository" field');

    // Scripts
    if (!pkg.scripts) {
      warnings.push('No scripts defined');
    } else {
      if (!pkg.scripts.test) warnings.push('No "test" script defined');
      if (!pkg.scripts.build && pkg.main) warnings.push('Has "main" but no "build" script');
    }

    // Dependencies
    if (pkg.dependencies) {
      const depsWithWildcard = Object.entries(pkg.dependencies)
        .filter(([, version]) => version === '*')
        .map(([name]) => name);

      if (depsWithWildcard.length > 0) {
        warnings.push(`Dependencies with "*" version: ${depsWithWildcard.join(', ')}`);
      }
    }

    let output = '📦 package.json Lint Results\n\n';

    if (issues.length === 0 && warnings.length === 0) {
      output += '✅ No issues found!\n\nPackage looks good!';
    } else {
      if (issues.length > 0) {
        output += `❌ Issues (${issues.length}):\n`;
        issues.forEach(issue => output += `  - ${issue}\n`);
        output += '\n';
      }

      if (warnings.length > 0) {
        output += `⚠️  Warnings (${warnings.length}):\n`;
        warnings.forEach(warning => output += `  - ${warning}\n`);
      }
    }

    state.text = output;
  } catch (error) {
    state.postError(`Invalid JSON: ${error.message}`);
  }
}
