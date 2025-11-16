/**
{
  "api": 1,
  "name": "Remove Empty Lines",
  "description": "Removes all empty lines and lines containing only whitespace",
  "author": "Boop",
  "icon": "filtration",
  "tags": "empty,lines,whitespace,clean,filter"
}
**/

function main(input) {
  try {
    let text = input.text;

    if (text.length === 0) {
      input.postError("Input is empty");
      return;
    }

    const lines = text.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim().length > 0);

    const removedCount = lines.length - nonEmptyLines.length;

    input.text = nonEmptyLines.join('\n');

    if (removedCount > 0) {
      input.postInfo(`Removed ${removedCount} empty line${removedCount === 1 ? '' : 's'}`);
    } else {
      input.postInfo("No empty lines found");
    }
  } catch (error) {
    input.postError("Error removing empty lines: " + error.message);
  }
}
