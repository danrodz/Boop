/**
  {
    "api": 1,
    "name": "Remove Zero-Width Characters",
    "description": "Remove invisible zero-width characters",
    "author": "Boop",
    "icon": "eye.slash",
    "tags": "zerowidth,invisible,remove,clean"
  }
**/

function main(state) {
  try {
    // Remove all zero-width characters
    let text = state.text;

    text = text.replace(/\u200B/g, ''); // Zero-width space
    text = text.replace(/\u200C/g, ''); // Zero-width non-joiner
    text = text.replace(/\u200D/g, ''); // Zero-width joiner
    text = text.replace(/\uFEFF/g, ''); // Zero-width no-break space (BOM)
    text = text.replace(/\u180E/g, ''); // Mongolian vowel separator

    state.text = text;
  } catch (error) {
    state.postError("Failed to remove zero-width characters: " + error.message);
  }
}
