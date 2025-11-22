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
  state.text = encodeURIComponent(state.text);
}
