/**
  {
    "api": 1,
    "name": "Extract Lines Containing Pattern",
    "description": "Extracts all lines containing a pattern (first line is the pattern)",
    "author": "Boop",
    "icon": "filter",
    "tags": "extract,filter,search,match,contains"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");

    if (lines.length < 2) {
      state.postError("Need at least 2 lines: first line is the search pattern");
      return;
    }

    const pattern = lines[0];
    const content = lines.slice(1);

    const matching = content.filter(line => line.includes(pattern));

    if (matching.length === 0) {
      state.postInfo("No lines found containing: " + pattern);
      state.text = "";
    } else {
      state.text = matching.join("\n");
    }
  } catch (error) {
    state.postError("Failed to extract lines: " + error.message);
  }
}
