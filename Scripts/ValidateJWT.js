/**
  {
    "api": 1,
    "name": "Validate JWT Structure",
    "description": "Validate JWT token structure and decode payload",
    "author": "Boop",
    "icon": "key",
    "tags": "jwt,token,validate,decode"
  }
**/

function main(state) {
  try {
    const token = state.text.trim();

    // JWT has 3 parts separated by dots
    const parts = token.split('.');

    if (parts.length !== 3) {
      state.text = '✗ Invalid JWT\n\nJWT must have 3 parts: header.payload.signature';
      return;
    }

    // Decode header and payload
    function base64UrlDecode(str) {
      str = str.replace(/-/g, '+').replace(/_/g, '/');
      while (str.length % 4) {
        str += '=';
      }
      return decodeURIComponent(escape(atob(str)));
    }

    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      let result = '✓ Valid JWT structure\n\n';
      result += '=== HEADER ===\n';
      result += JSON.stringify(header, null, 2);
      result += '\n\n=== PAYLOAD ===\n';
      result += JSON.stringify(payload, null, 2);

      // Check expiration
      if (payload.exp) {
        const expDate = new Date(payload.exp * 1000);
        const isExpired = expDate < new Date();
        result += `\n\n=== EXPIRATION ===\n`;
        result += `Expires: ${expDate.toISOString()}\n`;
        result += `Status: ${isExpired ? '✗ Expired' : '✓ Valid'}`;
      }

      state.text = result;
    } catch (e) {
      state.text = '✗ Invalid JWT\n\nCould not decode header or payload';
    }
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}
