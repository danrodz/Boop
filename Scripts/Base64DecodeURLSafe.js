/**
  {
    "api": 1,
    "name": "Base64 Decode (URL Safe)",
    "description": "Decodes URL-safe Base64 (RFC 4648)",
    "author": "Boop",
    "icon": "lock.open.fill",
    "tags": "base64,decode,url,safe"
  }
**/

function main(state) {
  try {
    // Convert from URL-safe back to standard Base64
    const standard = state.text.trim().replace(/-/g, '+').replace(/_/g, '/').replace(/~/g, '=');
    const decoded = decodeURIComponent(escape(atob(standard)));
    state.text = decoded;
  } catch (error) {
    state.postError("Failed to decode: " + error.message);
  }
}
