/**
  {
    "api": 1,
    "name": "Find & Replace",
    "description": "Find and replace text with regex support",
    "author": "Boop",
    "icon": "arrow.left.arrow.right.square.fill",
    "tags": "find,replace,search,regex,substitute"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');

    if (lines.length < 3) {
      state.postError("Format: Line 1 = find pattern, Line 2 = replacement, Line 3+ = text");
      return;
    }

    const findPattern = lines[0];
    const replacement = lines[1];
    const text = lines.slice(2).join('\n');

    // Check if pattern looks like regex (starts and ends with /)
    let result;
    if (findPattern.startsWith('/') && findPattern.lastIndexOf('/') > 0) {
      const lastSlash = findPattern.lastIndexOf('/');
      const pattern = findPattern.substring(1, lastSlash);
      const flags = findPattern.substring(lastSlash + 1);
      const regex = new RegExp(pattern, flags || 'g');
      result = text.replace(regex, replacement);
    } else {
      // Simple string replacement
      result = text.split(findPattern).join(replacement);
    }

    const changes = text.split(findPattern).length - 1;

    state.text = result;
    state.postInfo(`Made ${changes} replacement${changes === 1 ? '' : 's'}`);

  } catch (error) {
    state.postError("Replace failed: " + error.message);
  }
}
