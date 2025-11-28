/**
  {
    "api": 1,
    "name": "Package.json Fixer",
    "description": "Fix and sort package.json with consistent formatting",
    "author": "Boop",
    "icon": "cube.box",
    "tags": "package,json,npm,node,fix,sort"
  }
**/

function main(state) {
  try {
    const pkg = JSON.parse(state.text);

    // Recommended order for package.json fields
    const order = [
      'name',
      'version',
      'description',
      'keywords',
      'homepage',
      'bugs',
      'license',
      'author',
      'contributors',
      'main',
      'module',
      'types',
      'bin',
      'files',
      'exports',
      'scripts',
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'optionalDependencies',
      'engines',
      'os',
      'cpu',
      'config',
      'repository'
    ];

    const sorted = {};

    // Add fields in order
    for (const key of order) {
      if (pkg[key] !== undefined) {
        if (key === 'scripts' || key.includes('ependencies')) {
          // Sort scripts and dependencies alphabetically
          const sortedObj = {};
          Object.keys(pkg[key]).sort().forEach(k => {
            sortedObj[k] = pkg[key][k];
          });
          sorted[key] = sortedObj;
        } else {
          sorted[key] = pkg[key];
        }
      }
    }

    // Add any remaining fields not in the order
    for (const key in pkg) {
      if (!sorted.hasOwnProperty(key)) {
        sorted[key] = pkg[key];
      }
    }

    state.text = JSON.stringify(sorted, null, 2);
    state.postInfo("Package.json formatted and sorted");
  } catch (error) {
    state.postError("Error fixing package.json: " + error.message);
  }
}
