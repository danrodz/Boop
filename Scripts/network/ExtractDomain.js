/**
  {
    "api": 1,
    "name": "Extract Domain from URL",
    "description": "Extracts domain name from URL",
    "author": "Boop",
    "icon": "network",
    "tags": "network,ip,mac,url,validate"
  }
**/

function main(state) {
  try {
    const url = new URL(state.text.trim());
    state.text = url.hostname;
  } catch {
    state.postError('Invalid URL');
  }
}
