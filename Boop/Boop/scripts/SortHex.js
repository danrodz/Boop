/**
  {
    "api": 1,
    "name": "Sort Hex Values",
    "description": "Sorts lines as hexadecimal numbers",
    "author": "Boop",
    "icon": "sort",
    "tags": "sort,hex,hexadecimal,numbers"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    lines.sort((a, b) => {
      const numA = parseInt(a.trim().replace(/^0x/i, ''), 16);
      const numB = parseInt(b.trim().replace(/^0x/i, ''), 16);
      return numA - numB;
    });
    state.text = lines.join("\n");
  } catch (error) {
    state.postError("Failed to sort hex values");
  }
}
