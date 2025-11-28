/**
  {
    "api": 1,
    "name": "Dependency Tree Flattener",
    "description": "Flatten nested dependency tree to list",
    "author": "Boop",
    "icon": "arrow.down.to.line.compact",
    "tags": "dependency,tree,flatten,npm,package"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const flattened = new Set();

    for (const line of lines) {
      // Extract package name from tree structure
      const match = line.match(/[├└│─\s]*([a-zA-Z0-9@\-_\/\.]+)@/);
      if (match) {
        flattened.add(match[1]);
      }
    }

    const sorted = Array.from(flattened).sort();
    state.text = sorted.join('\n');
    state.postInfo(`Found ${sorted.length} unique dependencies`);
  } catch (error) {
    state.postError("Error flattening dependency tree: " + error.message);
  }
}
