/**
  {
    "api": 1,
    "name": "Extract Protocol from URL",
    "description": "Extracts protocol from URL",
    "author": "Boop",
    "icon": "network",
    "tags": "network,ip,mac,url,validate"
  }
**/

function main(state) {
  try {
    const url = new URL(state.text.trim());
    state.text = url.protocol;
  } catch {
    state.postError('Invalid URL');
  }
}
