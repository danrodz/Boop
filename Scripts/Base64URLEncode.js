/**
  {
    "api": 1,
    "name": "Base64 URL Encode",
    "description": "Encode to Base64 URL-safe format (used in JWT)",
    "author": "Boop",
    "icon": "lock",
    "tags": "base64,url,encode,jwt,api"
  }
**/

function main(state) {
  const base64 = btoa(state.text);
  const base64url = base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  state.text = base64url;
  state.postInfo("Base64 URL encoded");
}
