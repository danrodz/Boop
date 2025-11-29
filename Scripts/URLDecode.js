/**
  {
    "api": 1,
    "name": "URL Decode",
    "description": "Decodes URL encoded text",
    "author": "Boop",
    "icon": "link.circle.fill",
    "tags": "url,decode,percent,uri"
  }
**/

function main(state) {
  try {
    state.text = decodeURIComponent(state.text);
    if (typeof state.postInfo === 'function') {
      state.postInfo("URL decoded");
    }
  } catch (error) {
    if (typeof state.postError === 'function') {
      state.postError("Failed to decode URL: " + error.message);
    }
  }
}
