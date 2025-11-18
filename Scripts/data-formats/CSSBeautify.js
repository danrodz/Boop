/**
  {
    "api": 1,
    "name": "CSS Beautify",
    "description": "Formats CSS with proper indentation",
    "author": "Boop",
    "icon": "arrow.up.left.and.arrow.down.right",
    "tags": "css,beautify,format,pretty"
  }
**/

function main(state) {
  let css = state.text;
  css = css.replace(/\{/g, ' {\n  ');
  css = css.replace(/\}/g, '\n}\n');
  css = css.replace(/;/g, ';\n  ');
  css = css.replace(/\n\s*\n/g, '\n');
  state.text = css.trim();
}
