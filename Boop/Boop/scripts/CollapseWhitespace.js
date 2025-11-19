/**
{
  "api": 1,
  "name": "Collapse Whitespace",
  "description": "Replaces multiple spaces with single space",
  "author": "Boop",
  "icon": "arrow.left.and.right",
  "tags": "collapse,whitespace,space"
}
**/

function main(state) {
  state.text = state.text.replace(/\s+/g, ' ');
}
