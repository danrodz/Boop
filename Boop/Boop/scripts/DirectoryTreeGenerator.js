/**
  {
    "api": 1,
    "name": "Directory Tree Generator",
    "description": "Generate directory tree structure from paths",
    "author": "Boop",
    "icon": "folder",
    "tags": "directory,tree,structure,folder,ascii"
  }
**/

function main(state) {
  try {
    const paths = state.text.split('\n').filter(p => p.trim());

    if (paths.length === 0) {
      state.text = 'Provide file paths, one per line:\nsrc/index.js\nsrc/utils/helper.js\nREADME.md';
      return;
    }

    // Build tree structure
    const tree = {};

    for (const path of paths) {
      const parts = path.split('/').filter(p => p);
      let current = tree;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (!current[part]) {
          current[part] = i === parts.length - 1 ? null : {};
        }

        if (current[part] !== null) {
          current = current[part];
        }
      }
    }

    // Generate tree visualization
    const lines = [];

    function printTree(obj, prefix = '', isLast = true) {
      const entries = Object.entries(obj);

      entries.forEach(([key, value], index) => {
        const isLastEntry = index === entries.length - 1;
        const connector = isLastEntry ? '└── ' : '├── ';
        const extension = isLastEntry ? '    ' : '│   ';

        lines.push(prefix + connector + key);

        if (value !== null && typeof value === 'object') {
          printTree(value, prefix + extension, isLastEntry);
        }
      });
    }

    lines.push('.');
    printTree(tree, '', true);

    state.text = lines.join('\n');
  } catch (error) {
    state.postError("Error generating tree: " + error.message);
  }
}
