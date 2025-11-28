/**
  {
    "api": 1,
    "name": "Generate Diff Patch",
    "description": "Generate unified diff patch (format: old---new)",
    "author": "Boop",
    "icon": "doc.text.magnifyingglass",
    "tags": "diff,patch,git,compare"
  }
**/

function main(state) {
  try {
    const parts = state.text.split('---');

    if (parts.length !== 2) {
      state.postError("Format: old_content---new_content");
      return;
    }

    const oldLines = parts[0].trim().split('\n');
    const newLines = parts[1].trim().split('\n');

    let result = '--- a/file.txt\n';
    result += '+++ b/file.txt\n';
    result += `@@ -1,${oldLines.length} +1,${newLines.length} @@\n`;

    // Simple diff
    const maxLen = Math.max(oldLines.length, newLines.length);

    for (let i = 0; i < maxLen; i++) {
      const oldLine = oldLines[i];
      const newLine = newLines[i];

      if (oldLine === newLine && oldLine !== undefined) {
        result += ` ${oldLine}\n`;
      } else {
        if (oldLine !== undefined) {
          result += `-${oldLine}\n`;
        }
        if (newLine !== undefined) {
          result += `+${newLine}\n`;
        }
      }
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to generate diff: " + error.message);
  }
}
