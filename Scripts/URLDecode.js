/**
  {
    "api": 1,
    "name": "URL Decode",
    "description": "Decode percent-encoded URLs",
    "author": "Boop",
    "icon": "link",
    "tags": "url,decode,percent,http,api"
  }
**/

function main(state) {
  try {
    state.text = decodeURIComponent(state.text);
    state.postInfo("URL decoded");
  } catch (error) {
    state.postError("Invalid URL encoding");
  }
}
