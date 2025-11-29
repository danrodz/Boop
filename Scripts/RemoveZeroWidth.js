/**
  {
    "api": 1,
    "name": "Remove Zero-Width Characters",
    "description": "Removes invisible zero-width characters",
    "author": "Boop",
    "icon": "eye.slash",
    "tags": "zero,width,invisible,hidden,unicode,clean"
  }
**/

function main(state) {
  try {
    const zeroWidth = /[\u200B\u200C\u200D\uFEFF\u00AD\u2060\u180E]/g;
    const matches = state.text.match(zeroWidth);
    const count = matches ? matches.length : 0;

    state.text = state.text.replace(zeroWidth, "");

    if (typeof state.postInfo === "function") {
      state.postInfo("Removed " + count + " zero-width character(s)");
    }
  } catch (error) {
    if (typeof state.postError === "function") {
      state.postError("Failed to remove zero-width characters: " + error.message);
    }
  }
}
