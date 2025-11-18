/**
  {
    "api": 1,
    "name": "Basic Auth Header Generator",
    "description": "Generate HTTP Basic Authentication header",
    "author": "Boop",
    "icon": "lock.shield",
    "tags": "basic,auth,http,header,authentication"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    const parts = input.split(':');

    if (parts.length !== 2) {
      state.postError("Format: username:password");
      return;
    }

    const [username, password] = parts;
    const credentials = `${username}:${password}`;
    const encoded = btoa(credentials);

    let result = `Username: ${username}\n`;
    result += `Password: ${password}\n\n`;
    result += `=== HTTP HEADER ===\n`;
    result += `Authorization: Basic ${encoded}\n\n`;
    result += `=== CURL ===\n`;
    result += `curl -H "Authorization: Basic ${encoded}" URL\n\n`;
    result += `=== ALTERNATE ===\n`;
    result += `curl -u ${username}:${password} URL`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to generate: " + error.message);
  }
}
