/**
  {
    "api": 1,
    "name": "JWT Decode & Parse",
    "description": "Decodes and pretty-prints JWT payload",
    "author": "Boop",
    "icon": "key.fill",
    "tags": "jwt,decode,json,auth,token"
  }
**/

function main(state) {
  try {
    const jwt = state.text.trim();
    const parts = jwt.split('.');

    if (parts.length !== 3) {
      state.postError("Invalid JWT format. Expected 3 parts separated by dots.");
      return;
    }

    // Decode header and payload
    const decodeBase64Url = (str) => {
      const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
      return decodeURIComponent(escape(atob(padded)));
    };

    const header = JSON.parse(decodeBase64Url(parts[0]));
    const payload = JSON.parse(decodeBase64Url(parts[1]));

    const result = {
      header: header,
      payload: payload,
      signature: parts[2]
    };

    // Add human-readable dates if present
    if (payload.exp) {
      result.expires = new Date(payload.exp * 1000).toISOString();
    }
    if (payload.iat) {
      result.issued = new Date(payload.iat * 1000).toISOString();
    }

    state.text = JSON.stringify(result, null, 2);
  } catch (error) {
    state.postError("Failed to decode JWT: " + error.message);
  }
}
