/**
  {
    "api": 1,
    "name": "Normalize Unicode (NFC)",
    "description": "Normalizes Unicode text to NFC (Canonical Decomposition, followed by Canonical Composition)",
    "author": "Boop",
    "icon": "type",
    "tags": "unicode,normalize,nfc"
  }
**/

function main(state) {
  try {
    state.text = state.text.normalize('NFC');
  } catch (error) {
    state.postError("Failed to normalize Unicode");
  }
}
