/**
  {
    "api": 1,
    "name": "Base64 Encode (URL Safe)",
    "description": "Encodes text to URL-safe Base64 (RFC 4648)",
    "author": "Boop",
    "icon": "lock.fill",
    "tags": "base64,encode,url,safe"
  }
**/

function main(state) {
  try {
    const base64 = btoa(unescape(encodeURIComponent(state.text)));
    // Convert to URL-safe: replace +/= with -_~
    const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '~');
    state.text = urlSafe;
  } catch (error) {
    state.postError("Failed to encode: " + error.message);
  }
}
