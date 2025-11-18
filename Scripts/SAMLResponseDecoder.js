/**
  {
    "api": 1,
    "name": "SAML Response Decoder",
    "description": "Decode Base64-encoded SAML response",
    "author": "Boop",
    "icon": "doc.text.magnifyingglass",
    "tags": "saml,decode,base64,xml,sso"
  }
**/
function main(state) {
  try {
    const decoded = atob(state.text.trim());
    state.text = '=== DECODED SAML ===\n\n' + decoded;
  } catch (e) {
    state.postError("Invalid Base64 encoding");
  }
}
