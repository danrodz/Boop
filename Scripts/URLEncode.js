/**
  {
    "api": 1,
    "name": "URL Encode",
    "description": "URL encodes text (percent encoding)",
    "author": "Boop",
    "icon": "link.circle.fill",
    "tags": "url,encode,percent,uri"
  }
**/

function main(state) {
  try {
    state.text = encodeURIComponent(state.text);
    if (typeof state.postInfo === 'function') {
      state.postInfo("URL encoded");
    }
  } catch (error) {
    if (typeof state.postError === 'function') {
      state.postError("Failed to encode URL: " + error.message);
    }
  }
}
