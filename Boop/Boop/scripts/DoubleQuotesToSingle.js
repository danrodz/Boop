/**
  {
    "api": 1,
    "name": "Convert \" to '",
    "description": "Converts double quotes to single quotes",
    "author": "Boop",
    "icon": "quote",
    "tags": "convert,quotes,double,single"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/"/g, "'");
  } catch (error) {
    state.postError("Failed to convert quotes");
  }
}
