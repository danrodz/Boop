/**
  {
    "api": 1,
    "name": "Minify JSON",
    "description": "Minifies JSON by removing whitespace",
    "author": "Boop",
    "icon": "arrow.down.right.and.arrow.up.left",
    "tags": "json,minify,compress,compact"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    const minified = JSON.stringify(json);

    const originalSize = state.text.length;
    const minifiedSize = minified.length;
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

    state.text = minified;
    state.postInfo(`Minified: ${originalSize} → ${minifiedSize} bytes (${savings}% smaller)`);

  } catch (error) {
    state.postError("Invalid JSON: " + error.message);
  }
}
