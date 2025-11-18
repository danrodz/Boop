/**
  {
    "api": 1,
    "name": "Normalize Unicode (NFD)",
    "description": "Normalizes Unicode text to NFD (Canonical Decomposition)",
    "author": "Boop",
    "icon": "type",
    "tags": "unicode,normalize,nfd"
  }
**/

function main(state) {
  try {
    state.text = state.text.normalize('NFD');
  } catch (error) {
    state.postError("Failed to normalize Unicode");
  }
}
