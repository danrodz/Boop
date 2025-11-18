/**
  {
    "api": 1,
    "name": "Wrap with Single Quotes",
    "description": "Wraps each line with single quotes",
    "author": "Boop",
    "icon": "quote",
    "tags": "wrap,quotes,single,format"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => "'" + line + "'").join("\n");
  } catch (error) {
    state.postError("Failed to wrap with quotes");
  }
}
