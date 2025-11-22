/**
  {
    "api": 1,
    "name": "Remove Matching",
    "description": "Removes lines matching regex pattern",
    "author": "Boop",
    "icon": "line.3.horizontal.decrease.circle",
    "tags": "filter,grep,remove,regex,delete"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');

    if (lines.length < 2) {
      state.postError("Line 1: regex pattern, Line 2+: text to filter");
      return;
    }

    const pattern = lines[0];
    const content = lines.slice(1);

    // Parse regex
    let regex;
    const match = pattern.match(/^\/(.+)\/([gimsuvy]*)$/);
    if (match) {
      regex = new RegExp(match[1], match[2]);
    } else {
      regex = new RegExp(pattern, 'i');
    }

    const kept = content.filter(line => !regex.test(line));
    const removed = content.length - kept.length;

    state.text = kept.join('\n');
    state.postInfo(`Removed ${removed} lines, kept ${kept.length}`);

  } catch (error) {
    state.postError("Regex error: " + error.message);
  }
}
