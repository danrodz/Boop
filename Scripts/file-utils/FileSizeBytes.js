/**
  {
    "api": 1,
    "name": "Format File Size (Bytes)",
    "description": "Shows number in bytes format",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const bytes = parseInt(state.text.trim());
  state.text = \`\${bytes.toLocaleString()} bytes\`;
}
