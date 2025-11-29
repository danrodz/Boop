/**
  {
    "api": 1,
    "name": "Collapse Whitespace",
    "description": "Collapses multiple spaces/tabs to single space",
    "author": "Boop",
    "icon": "arrow.left.and.right.righttriangle.left.righttriangle.right.fill",
    "tags": "collapse,whitespace,clean,normalize"
  }
**/

function main(state) {
  state.text = state.text
    .replace(/[ \t]+/g, ' ')  // Collapse horizontal whitespace
    .replace(/\n{3,}/g, '\n\n');  // Max 2 consecutive newlines
}
