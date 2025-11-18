/**
  {
    "api": 1,
    "name": "CSS Minify",
    "description": "Minifies CSS by removing whitespace and comments",
    "author": "Boop",
    "icon": "arrow.down.right.and.arrow.up.left",
    "tags": "css,minify,compact,compress"
  }
**/

function main(state) {
  let css = state.text;
  css = css.replace(/\/\*.*?\*\//gs, '');
  css = css.replace(/\s{2,}/g, ' ');
  css = css.replace(/\s*([{}:;,])\s*/g, '$1');
  state.text = css.trim();
}
