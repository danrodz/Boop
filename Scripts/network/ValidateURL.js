/**
  {
    "api": 1,
    "name": "Validate URL",
    "description": "Checks if text is a valid URL",
    "author": "Boop",
    "icon": "network",
    "tags": "network,ip,mac,url,validate"
  }
**/

function main(state) {
  try {
    new URL(state.text.trim());
    state.text = 'Valid URL';
  } catch {
    state.text = 'Invalid URL';
  }
}
