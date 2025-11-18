/**
  {
    "api": 1,
    "name": "Sort Numeric",
    "description": "Sorts lines as numeric values",
    "author": "Boop",
    "icon": "sort",
    "tags": "sort,numeric,numbers"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    lines.sort((a, b) => {
      const numA = parseFloat(a.trim());
      const numB = parseFloat(b.trim());
      return numA - numB;
    });
    state.text = lines.join("\n");
  } catch (error) {
    state.postError("Failed to sort numerically");
  }
}
