/**
  {
    "api": 1,
    "name": "Byte Size Calculator",
    "description": "Shows text size in bytes (UTF-8)",
    "author": "Boop",
    "icon": "scalemass.fill",
    "tags": "bytes,size,calculate,utf8"
  }
**/

function main(state) {
  const text = state.text;
  const bytes = new TextEncoder().encode(text).length;

  let sizeStr;
  if (bytes < 1024) {
    sizeStr = `${bytes} bytes`;
  } else if (bytes < 1024 * 1024) {
    sizeStr = `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    sizeStr = `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  state.text = `TEXT SIZE (UTF-8)

Characters: ${text.length.toLocaleString()}
Bytes: ${bytes.toLocaleString()} (${sizeStr})
Lines: ${text.split('\n').length.toLocaleString()}
Words: ${text.split(/\s+/).filter(w => w).length.toLocaleString()}`;
}
