/**
  {
    "api": 1,
    "name": "Convert ' to \"",
    "description": "Converts single quotes to double quotes",
    "author": "Boop",
    "icon": "quote",
    "tags": "convert,quotes,single,double"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/'/g, '"');
  } catch (error) {
    state.postError("Failed to convert quotes");
  }
}
