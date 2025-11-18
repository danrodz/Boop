/**
  {
    "api": 1,
    "name": "Combine Lines with Delimiter",
    "description": "Combines lines with a custom delimiter (first line is delimiter)",
    "author": "Boop",
    "icon": "link",
    "tags": "combine,join,merge,delimiter,separator"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");

    if (lines.length < 2) {
      state.postError("Need at least 2 lines: first line is delimiter");
      return;
    }

    const delimiter = lines[0];
    const content = lines.slice(1);

    state.text = content.join(delimiter);
  } catch (error) {
    state.postError("Failed to combine lines: " + error.message);
  }
}
