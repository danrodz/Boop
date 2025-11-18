/**
  {
    "api": 1,
    "name": "Enclose Words in Parentheses",
    "description": "Encloses each word in parentheses",
    "author": "Boop",
    "icon": "brackets",
    "tags": "enclose,parentheses,wrap,words"
  }
**/

function main(state) {
  try {
    const words = state.text.split(/\s+/).filter(w => w.length > 0);
    state.text = words.map(w => `(${w})`).join(' ');
  } catch (error) {
    state.postError("Failed to enclose words");
  }
}
