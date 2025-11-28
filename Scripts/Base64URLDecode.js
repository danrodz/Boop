/**
  {
    "api": 1,
    "name": "Base64 URL Decode",
    "description": "Decode Base64 URL-safe format",
    "author": "Boop",
    "icon": "lock",
    "tags": "base64,url,decode,jwt,api"
  }
**/

function main(state) {
  try {
    let base64url = state.text.trim();

    // Convert URL-safe Base64 to standard Base64
    let base64 = base64url
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }

    state.text = atob(base64);
    state.postInfo("Base64 URL decoded");
  } catch (error) {
    state.postError("Invalid Base64 URL encoding");
  }
}
