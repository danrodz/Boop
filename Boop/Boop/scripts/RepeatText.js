/**
  {
    "api": 1,
    "name": "Repeat Text N Times",
    "description": "Repeats the text N times (first line is N, rest is content)",
    "author": "Boop",
    "icon": "copy",
    "tags": "repeat,duplicate,multiply,replicate"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");

    if (lines.length < 2) {
      state.postError("Need at least 2 lines: first line is the repeat count");
      return;
    }

    const count = parseInt(lines[0].trim(), 10);

    if (isNaN(count) || count <= 0) {
      state.postError("First line must be a positive number");
      return;
    }

    if (count > 10000) {
      state.postError("Repeat count too large (max 10000)");
      return;
    }

    const content = lines.slice(1).join("\n");
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push(content);
    }

    state.text = result.join("\n");
  } catch (error) {
    state.postError("Failed to repeat text: " + error.message);
  }
}
