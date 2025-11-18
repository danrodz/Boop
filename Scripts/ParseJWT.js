/**
  {
    "api": 1,
    "name": "Parse JWT Token",
    "description": "Decode and display JWT token payload",
    "author": "Boop",
    "icon": "key",
    "tags": "jwt,token,decode,auth,api"
  }
**/

function main(state) {
  try {
    const token = state.text.trim();
    const parts = token.split('.');

    if (parts.length !== 3) {
      state.postError("Invalid JWT format. Expected 3 parts separated by dots.");
      return;
    }

    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));

    const result = {
      header: header,
      payload: payload,
      signature: parts[2]
    };

    state.text = JSON.stringify(result, null, 2);
    state.postInfo("JWT parsed successfully");
  } catch (error) {
    state.postError(`Error parsing JWT: ${error.message}`);
  }
}
