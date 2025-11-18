/**
  {
    "api": 1,
    "name": "Wrap with Double Quotes",
    "description": "Wraps each line with double quotes",
    "author": "Boop",
    "icon": "quote",
    "tags": "wrap,quotes,double,format"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => '"' + line + '"').join("\n");
  } catch (error) {
    state.postError("Failed to wrap with quotes");
  }
}
