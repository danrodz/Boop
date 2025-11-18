/**
  {
    "api": 1,
    "name": "Split by Comma into Lines",
    "description": "Splits comma-separated values into separate lines",
    "author": "Boop",
    "icon": "split",
    "tags": "split,comma,lines,csv"
  }
**/

function main(state) {
  try {
    const parts = state.text.split(',').map(s => s.trim()).filter(s => s.length > 0);
    state.text = parts.join("\n");
  } catch (error) {
    state.postError("Failed to split by comma");
  }
}
