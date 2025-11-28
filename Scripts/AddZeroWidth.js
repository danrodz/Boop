/**
  {
    "api": 1,
    "name": "Add Zero-Width Spaces",
    "description": "Add zero-width spaces between characters (steganography)",
    "author": "Boop",
    "icon": "eye.slash",
    "tags": "zerowidth,invisible,steganography,hide"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const ZWSP = '\u200B'; // Zero-width space

    // Add zero-width space between each character
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += text[i];
      if (i < text.length - 1) {
        result += ZWSP;
      }
    }

    state.text = result;
    state.postInfo("Added zero-width spaces (invisible)");
  } catch (error) {
    state.postError("Failed to add zero-width spaces: " + error.message);
  }
}
