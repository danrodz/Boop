/**
  {
    "api": 1,
    "name": "Number to Binary",
    "description": "Converts decimal numbers to binary",
    "author": "Boop",
    "icon": "hash",
    "tags": "convert,binary,number,decimal"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/\b\d+\b/g, match => {
      return '0b' + parseInt(match, 10).toString(2);
    });
  } catch (error) {
    state.postError("Failed to convert to binary");
  }
}
