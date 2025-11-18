/**
  {
    "api": 1,
    "name": "Random Line",
    "description": "Selects a random line from the text",
    "author": "Boop",
    "icon": "shuffle",
    "tags": "random,pick,select,choose,line"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n").filter(line => line.trim().length > 0);

    if (lines.length === 0) {
      state.postError("No lines to select from");
      return;
    }

    const randomIndex = Math.floor(Math.random() * lines.length);
    state.text = lines[randomIndex];

    state.postInfo(`Selected line ${randomIndex + 1} of ${lines.length}`);
  } catch (error) {
    state.postError("Failed to select random line: " + error.message);
  }
}
