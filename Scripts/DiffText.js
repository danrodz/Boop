/**
  {
    "api": 1,
    "name": "Diff Text",
    "description": "Shows line-by-line differences between two texts",
    "author": "Boop",
    "icon": "arrow.left.arrow.right.square.fill",
    "tags": "diff,compare,difference,text,changes"
  }
**/

function main(state) {
  try {
    const parts = state.text.split('\n---\n');

    if (parts.length !== 2) {
      state.postError("Separate two texts with: ---");
      return;
    }

    const lines1 = parts[0].split('\n');
    const lines2 = parts[1].split('\n');

    let result = 'TEXT DIFF\n\n';

    // Simple line-by-line diff
    const maxLines = Math.max(lines1.length, lines2.length);
    let differences = 0;

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i];
      const line2 = lines2[i];

      if (line1 !== line2) {
        differences++;
        result += `Line ${i + 1}:\n`;

        if (line1 === undefined) {
          result += `  + Added: "${line2}"\n`;
        } else if (line2 === undefined) {
          result += `  - Removed: "${line1}"\n`;
        } else {
          result += `  - Old: "${line1}"\n`;
          result += `  + New: "${line2}"\n`;
        }

        result += '\n';
      }
    }

    if (differences === 0) {
      result += '✓ Texts are identical\n';
    } else {
      result = `Found ${differences} difference${differences === 1 ? '' : 's'}\n\n` + result;
    }

    state.text = result;

  } catch (error) {
    state.postError("Failed to diff texts: " + error.message);
  }
}
