/**
  {
    "api": 1,
    "name": "URL Encode",
    "description": "Encode text for use in URLs (percent encoding)",
    "author": "Boop",
    "icon": "link",
    "tags": "url,encode,percent,http,api"
  }
**/

function main(state) {
  state.text = encodeURIComponent(state.text);
  state.postInfo("URL encoded");
}
