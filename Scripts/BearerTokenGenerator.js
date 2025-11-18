/**
  {
    "api": 1,
    "name": "Bearer Token Generator",
    "description": "Generate random bearer token",
    "author": "Boop",
    "icon": "key",
    "tags": "bearer,token,generate,auth,api"
  }
**/

function main(state) {
  try {
    const length = parseInt(state.text) || 32;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }

    let result = `Bearer Token (${length} characters):\n\n`;
    result += `${token}\n\n`;
    result += `=== HTTP HEADER ===\n`;
    result += `Authorization: Bearer ${token}\n\n`;
    result += `=== CURL ===\n`;
    result += `curl -H "Authorization: Bearer ${token}" URL`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to generate: " + error.message);
  }
}
