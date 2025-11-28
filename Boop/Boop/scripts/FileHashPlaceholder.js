/**
  {
    "api": 1,
    "name": "File Hash Placeholder",
    "description": "Generate filename with hash placeholder for cache busting",
    "author": "Boop",
    "icon": "number.square",
    "tags": "file,hash,cache,busting,placeholder"
  }
**/

function main(state) {
  try {
    const filename = state.text.trim();

    // Split filename and extension
    const lastDot = filename.lastIndexOf('.');
    let name = filename;
    let ext = '';

    if (lastDot > 0) {
      name = filename.substring(0, lastDot);
      ext = filename.substring(lastDot);
    }

    // Generate random hash for demonstration
    const hash = Math.random().toString(36).substring(2, 10);

    const patterns = [
      `${name}.${hash}${ext}`,
      `${name}-${hash}${ext}`,
      `${name}_${hash}${ext}`,
      `${name}?v=${hash}`,
      `${name}${ext}?hash=${hash}`
    ];

    const result = [
      'Cache-Busting Filename Patterns:',
      '',
      ...patterns.map((p, i) => `${i + 1}. ${p}`),
      '',
      'Note: Replace hash with actual file content hash (MD5, SHA256, etc.)'
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error generating hash placeholder: " + error.message);
  }
}
