/**
  {
    "api": 1,
    "name": "Percent Decode",
    "description": "Decodes percent-encoded text",
    "author": "Boop",
    "icon": "percent",
    "tags": "percent,decode,url"
  }
**/

function main(state) {
  try {
    const decoded = state.text.replace(/%([0-9A-F]{2})/gi, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
    state.text = decoded;
  } catch (error) {
    state.postError("Failed to decode percent-encoded text: " + error.message);
  }
}
