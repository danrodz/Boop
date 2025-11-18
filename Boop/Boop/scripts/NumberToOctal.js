/**
  {
    "api": 1,
    "name": "Number to Octal",
    "description": "Converts decimal numbers to octal",
    "author": "Boop",
    "icon": "hash",
    "tags": "convert,octal,number,decimal"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/\b\d+\b/g, match => {
      return '0o' + parseInt(match, 10).toString(8);
    });
  } catch (error) {
    state.postError("Failed to convert to octal");
  }
}
