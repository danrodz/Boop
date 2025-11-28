/**
  {
    "api": 1,
    "name": "Text Differ",
    "description": "Show differences between two texts (separate with '---')",
    "author": "Boop",
    "icon": "doc.on.doc",
    "tags": "diff,compare,difference,text"
  }
**/

function main(state) {
  try {
    const parts = state.text.split('---');

    if (parts.length < 2) {
      state.postError("Separate two texts with '---'");
      return;
    }

    const text1 = parts[0].trim().split('\n');
    const text2 = parts[1].trim().split('\n');

    const result = [];

    const maxLines = Math.max(text1.length, text2.length);

    for (let i = 0; i < maxLines; i++) {
      const line1 = text1[i] || '';
      const line2 = text2[i] || '';

      if (line1 === line2) {
        result.push(`  ${line1}`);
      } else {
        if (line1) result.push(`- ${line1}`);
        if (line2) result.push(`+ ${line2}`);
      }
    }

    // Statistics
    const removed = text1.filter((line, i) => line !== text2[i]).length;
    const added = text2.filter((line, i) => line !== text1[i]).length;

    result.push('');
    result.push(`Lines removed: ${removed}`);
    result.push(`Lines added: ${added}`);

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error comparing texts: " + error.message);
  }
}
