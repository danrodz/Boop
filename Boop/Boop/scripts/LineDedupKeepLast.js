/**
{
  "api": 1,
  "name": "Remove Duplicate Lines (Keep Last)",
  "description": "Removes duplicate lines, keeping the last occurrence of each line.",
  "author": "Boop",
  "icon": "filtration",
  "tags": "unique,duplicate,dedup,lines,last"
}
**/

function main(input) {
  try {
    const lines = input.text.split('\n');
    const seen = new Map();

    // Store each line with its last index
    for (let i = 0; i < lines.length; i++) {
      seen.set(lines[i], i);
    }

    // Filter lines to keep only those at their last occurrence index
    const result = [];
    for (let i = 0; i < lines.length; i++) {
      if (seen.get(lines[i]) === i) {
        result.push(lines[i]);
      }
    }

    const removed = lines.length - result.length;
    input.text = result.join('\n');

    if (removed > 0) {
      input.postInfo(`Removed ${removed} duplicate line${removed === 1 ? '' : 's'}`);
    } else {
      input.postInfo('No duplicate lines found');
    }
  } catch (error) {
    input.postError(`Error: ${error.message}`);
  }
}
