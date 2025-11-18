/**
  {
    "api": 1,
    "name": "Unwrap Quotes",
    "description": "Removes surrounding quotes from each line",
    "author": "Boop",
    "icon": "quote",
    "tags": "unwrap,quotes,remove,strip"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => {
      return line.replace(/^["']|["']$/g, '');
    }).join("\n");
  } catch (error) {
    state.postError("Failed to unwrap quotes");
  }
}
