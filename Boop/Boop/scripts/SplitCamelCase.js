/**
  {
    "api": 1,
    "name": "Split camelCase to Words",
    "description": "Splits camelCase text into separate words",
    "author": "Boop",
    "icon": "split",
    "tags": "split,camel,case,words,separate"
  }
**/

function main(state) {
  try {
    // Split on uppercase letters
    const words = state.text.replace(/([A-Z])/g, ' $1').trim();
    state.text = words;
  } catch (error) {
    state.postError("Failed to split camelCase");
  }
}
