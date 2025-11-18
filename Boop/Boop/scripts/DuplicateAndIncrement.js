/**
  {
    "api": 1,
    "name": "Duplicate Lines & Increment Numbers",
    "description": "Duplicates each line and increments numbers in the duplicate",
    "author": "Boop",
    "icon": "copy",
    "tags": "duplicate,increment,numbers,copy"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    const result = [];

    lines.forEach(line => {
      result.push(line);
      const incremented = line.replace(/\d+/g, match => {
        return String(parseInt(match, 10) + 1);
      });
      result.push(incremented);
    });

    state.text = result.join("\n");
  } catch (error) {
    state.postError("Failed to duplicate and increment");
  }
}
