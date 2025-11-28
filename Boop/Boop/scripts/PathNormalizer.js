/**
  {
    "api": 1,
    "name": "Path Normalizer",
    "description": "Normalize file paths (resolve .., ., etc.)",
    "author": "Boop",
    "icon": "arrow.triangle.swap",
    "tags": "path,normalize,file,directory"
  }
**/

function main(state) {
  try {
    const paths = state.text.split('\n');
    const normalized = [];

    for (const path of paths) {
      if (!path.trim()) continue;

      const parts = path.split('/').filter(p => p && p !== '.');
      const stack = [];

      for (const part of parts) {
        if (part === '..') {
          if (stack.length > 0 && stack[stack.length - 1] !== '..') {
            stack.pop();
          } else {
            stack.push(part);
          }
        } else {
          stack.push(part);
        }
      }

      const result = '/' + stack.join('/');
      normalized.push(result);
    }

    state.text = normalized.join('\n');
  } catch (error) {
    state.postError("Error normalizing paths: " + error.message);
  }
}
