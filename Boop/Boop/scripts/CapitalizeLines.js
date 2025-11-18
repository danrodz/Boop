/**
  {
    "api": 1,
    "name": "Capitalize Each Line",
    "description": "Capitalizes the first letter of each line",
    "author": "Boop",
    "icon": "type",
    "tags": "capitalize,lines,sentence,case"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => {
      if (line.length === 0) return line;
      return line.charAt(0).toUpperCase() + line.slice(1);
    }).join("\n");
  } catch (error) {
    state.postError("Failed to capitalize lines");
  }
}
