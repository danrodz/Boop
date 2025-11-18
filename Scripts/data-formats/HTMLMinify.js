/**
  {
    "api": 1,
    "name": "HTML Minify",
    "description": "Minifies HTML by removing whitespace",
    "author": "Boop",
    "icon": "arrow.down.right.and.arrow.up.left",
    "tags": "html,minify,compact,compress"
  }
**/

function main(state) {
  let html = state.text;
  html = html.replace(/<!--.*?-->/gs, '');
  html = html.replace(/>\s+</g, '><');
  html = html.replace(/\s{2,}/g, ' ');
  state.text = html.trim();
}
