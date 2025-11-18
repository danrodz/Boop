/**
  {
    "api": 1,
    "name": "Number to Hex",
    "description": "Converts decimal numbers to hexadecimal",
    "author": "Boop",
    "icon": "hash",
    "tags": "convert,hex,hexadecimal,number,decimal"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/\b\d+\b/g, match => {
      return '0x' + parseInt(match, 10).toString(16).toUpperCase();
    });
  } catch (error) {
    state.postError("Failed to convert to hex");
  }
}
