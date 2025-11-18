/**
  {
    "api": 1,
    "name": "JWT Generator (Simple)",
    "description": "Generate simple JWT token (unsecured, for testing)",
    "author": "Boop",
    "icon": "key.fill",
    "tags": "jwt,token,generate,auth"
  }
**/

function main(state) {
  try {
    const payload = state.text.trim() ? JSON.parse(state.text) : { sub: "1234567890", name: "John Doe", iat: Math.floor(Date.now() / 1000) };

    const header = { alg: "none", typ: "JWT" };

    function base64UrlEncode(obj) {
      const json = JSON.stringify(obj);
      const base64 = btoa(json);
      return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    }

    const headerEncoded = base64UrlEncode(header);
    const payloadEncoded = base64UrlEncode(payload);

    const jwt = `${headerEncoded}.${payloadEncoded}.`;

    let result = `=== UNSECURED JWT (for testing only) ===\n\n`;
    result += jwt + '\n\n';
    result += `Header:\n${JSON.stringify(header, null, 2)}\n\n`;
    result += `Payload:\n${JSON.stringify(payload, null, 2)}\n\n`;
    result += `⚠️  Note: This JWT is not signed and should only be used for testing!`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to generate JWT: " + error.message);
  }
}
