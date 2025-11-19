/**
  {
    "api": 1,
    "name": "Bytes to KB",
    "description": "Converts bytes to kilobytes",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const bytes = parseInt(state.text.trim());
  state.text = \`\${(bytes / 1024).toFixed(2)} KB\`;
}
