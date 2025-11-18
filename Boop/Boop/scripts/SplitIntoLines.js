/**
  {
    "api": 1,
    "name": "Split Words into Lines",
    "description": "Splits words into separate lines",
    "author": "Boop",
    "icon": "split",
    "tags": "split,words,lines,separate"
  }
**/

function main(state) {
  try {
    const words = state.text.split(/\s+/).filter(w => w.length > 0);
    state.text = words.join("\n");
  } catch (error) {
    state.postError("Failed to split into lines");
  }
}
