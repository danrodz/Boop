/**
  {
    "api": 1,
    "name": "Sentence Case",
    "description": "Converts text to sentence case (capitalize first letter of sentences)",
    "author": "Boop",
    "icon": "type",
    "tags": "sentence,case,capitalize,format"
  }
**/

function main(state) {
  try {
    // Convert to lowercase first
    let text = state.text.toLowerCase();

    // Capitalize first letter of each sentence
    text = text.replace(/(^\s*\w|[.!?]\s+\w)/g, match => match.toUpperCase());

    state.text = text;
  } catch (error) {
    state.postError("Failed to convert to sentence case");
  }
}
