/**
  {
    "api": 1,
    "name": "Add Line Numbers",
    "description": "Adds line numbers to each line",
    "author": "Boop",
    "icon": "list",
    "tags": "line,numbers,add,prefix"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map((line, index) => {
      return (index + 1) + '. ' + line;
    }).join("\n");
  } catch (error) {
    state.postError("Failed to add line numbers");
  }
}
