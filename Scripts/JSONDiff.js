/**
  {
    "api": 1,
    "name": "JSON Diff",
    "description": "Shows differences between two JSON objects",
    "author": "Boop",
    "icon": "arrow.left.arrow.right.circle.fill",
    "tags": "json,diff,compare,difference"
  }
**/

function main(state) {
  try {
    const parts = state.text.split('\n---\n');

    if (parts.length !== 2) {
      state.postError("Separate two JSON objects with: ---");
      return;
    }

    const obj1 = JSON.parse(parts[0]);
    const obj2 = JSON.parse(parts[1]);

    const differences = [];

    function compare(path, val1, val2) {
      const type1 = typeof val1;
      const type2 = typeof val2;

      if (type1 !== type2) {
        differences.push({
          path: path,
          type: 'type_changed',
          old: `${type1}: ${JSON.stringify(val1)}`,
          new: `${type2}: ${JSON.stringify(val2)}`
        });
        return;
      }

      if (val1 === null || val2 === null || type1 !== 'object') {
        if (val1 !== val2) {
          differences.push({
            path: path,
            type: 'value_changed',
            old: JSON.stringify(val1),
            new: JSON.stringify(val2)
          });
        }
        return;
      }

      // Compare objects/arrays
      const keys1 = Object.keys(val1);
      const keys2 = Object.keys(val2);
      const allKeys = [...new Set([...keys1, ...keys2])];

      allKeys.forEach(key => {
        const newPath = path ? `${path}.${key}` : key;

        if (!(key in val1)) {
          differences.push({
            path: newPath,
            type: 'added',
            value: JSON.stringify(val2[key])
          });
        } else if (!(key in val2)) {
          differences.push({
            path: newPath,
            type: 'removed',
            value: JSON.stringify(val1[key])
          });
        } else {
          compare(newPath, val1[key], val2[key]);
        }
      });
    }

    compare('', obj1, obj2);

    if (differences.length === 0) {
      state.text = "✓ No differences found - objects are identical";
      return;
    }

    let result = `Found ${differences.length} difference${differences.length === 1 ? '' : 's'}:\n\n`;

    differences.forEach((diff, i) => {
      result += `${i + 1}. ${diff.path}\n`;

      if (diff.type === 'value_changed') {
        result += `   - Old: ${diff.old}\n`;
        result += `   + New: ${diff.new}\n`;
      } else if (diff.type === 'type_changed') {
        result += `   ~ Type: ${diff.old} → ${diff.new}\n`;
      } else if (diff.type === 'added') {
        result += `   + Added: ${diff.value}\n`;
      } else if (diff.type === 'removed') {
        result += `   - Removed: ${diff.value}\n`;
      }

      result += '\n';
    });

    state.text = result.trim();

  } catch (error) {
    state.postError("Failed to compare JSON: " + error.message);
  }
}
