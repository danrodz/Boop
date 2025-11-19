/**
  {
    "api": 1,
    "name": "JavaScript Minifier",
    "description": "Basic JavaScript minification (whitespace/comments)",
    "author": "Boop",
    "icon": "doc.text.fill",
    "tags": "javascript,js,minify,compress,optimize"
  }
**/

function main(state) {
  let js = state.text;

  // Remove single-line comments (but not URLs)
  js = js.replace(/([^:])\/\/.*$/gm, '$1');

  // Remove multi-line comments
  js = js.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove unnecessary whitespace
  js = js.replace(/\s+/g, ' ');

  // Remove spaces around operators and punctuation
  js = js.replace(/\s*([{}()[\];,+\-*/%=<>!&|?:])\s*/g, '$1');

  // Remove leading/trailing whitespace
  js = js.trim();

  // Preserve spaces in some cases (e.g., "return x", "typeof x")
  js = js.replace(/\b(return|typeof|delete|void|new|throw|else|case)\b/g, ' $1 ');
  js = js.replace(/\s+/g, ' ');

  const originalSize = state.text.length;
  const minifiedSize = js.length;
  const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

  state.text = js;
  state.postInfo(`Minified: ${originalSize} → ${minifiedSize} bytes (${savings}% smaller)`);
}
