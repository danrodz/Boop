/**
  {
    "api": 1,
    "name": "Text Diff",
    "description": "Show differences between two texts (separate with ---)",
    "author": "Boop",
    "icon": "arrow.left.arrow.right",
    "tags": "diff,compare,changes"
  }
**/

function main(state) {
  try {
    const parts = state.text.split('---');

    if (parts.length !== 2) {
      state.postError("Format: text1---text2");
      return;
    }

    const lines1 = parts[0].trim().split('\n');
    const lines2 = parts[1].trim().split('\n');

    let result = '';

    const maxLines = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        result += `  ${line1}\n`;
      } else {
        if (line1) result += `- ${line1}\n`;
        if (line2) result += `+ ${line2}\n`;
      }
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to generate diff: " + error.message);
  }
}
