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
  } catch (error) {
    state.postError("Failed to decode URL: " + error.message);
  }
}
