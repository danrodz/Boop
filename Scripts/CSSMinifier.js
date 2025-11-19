/**
  {
    "api": 1,
    "name": "CSS Minifier",
    "description": "Minifies CSS by removing whitespace and comments",
    "author": "Boop",
    "icon": "doc.text.fill",
    "tags": "css,minify,compress,optimize"
  }
**/

function main(state) {
  let css = state.text;

  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove whitespace around special characters
  css = css.replace(/\s*([{}:;,>+~])\s*/g, '$1');

  // Remove whitespace around operators in calc()
  css = css.replace(/calc\s*\(\s*/g, 'calc(');

  // Remove last semicolon in blocks
  css = css.replace(/;}/g, '}');

  // Collapse multiple spaces
  css = css.replace(/\s+/g, ' ');

  // Remove leading/trailing whitespace
  css = css.trim();

  const originalSize = state.text.length;
  const minifiedSize = css.length;
  const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

  state.text = css;
  state.postInfo(`Minified: ${originalSize} → ${minifiedSize} bytes (${savings}% smaller)`);
}
