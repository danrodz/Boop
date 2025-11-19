/**
  {
    "api": 1,
    "name": "Bytes to GB",
    "description": "Converts bytes to gigabytes",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const bytes = parseInt(state.text.trim());
  state.text = \`\${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB\`;
}
