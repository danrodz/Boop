/**
  {
    "api": 1,
    "name": "Remove Line Numbers",
    "description": "Removes line numbers from the beginning of each line",
    "author": "Boop",
    "icon": "trash",
    "tags": "remove,line,numbers,prefix"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => {
      return line.replace(/^\d+\.\s*/, '');
    }).join("\n");
  } catch (error) {
    state.postError("Failed to remove line numbers");
  }
}
