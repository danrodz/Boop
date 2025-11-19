/**
  {
    "api": 1,
    "name": "XML Minify",
    "description": "Minifies XML by removing whitespace",
    "author": "Boop",
    "icon": "arrow.down.right.and.arrow.up.left",
    "tags": "xml,minify,compact,compress"
  }
**/

function main(state) {
  state.text = state.text.replace(/>\s+</g, '><').trim();
}
