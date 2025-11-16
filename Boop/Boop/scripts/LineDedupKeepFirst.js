/**
{
  "api": 1,
  "name": "Remove Duplicate Lines (Keep First)",
  "description": "Removes duplicate lines, keeping the first occurrence of each line.",
  "author": "Boop",
  "icon": "filtration",
  "tags": "unique,duplicate,dedup,lines,first"
}
**/

function main(input) {
  try {
    const lines = input.text.split('\n');
    const seen = new Set();
    const result = [];

    for (let line of lines) {
      if (!seen.has(line)) {
        seen.add(line);
        result.push(line);
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
