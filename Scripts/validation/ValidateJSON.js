/**
  {
    "api": 1,
    "name": "Validate JSON",
    "description": "Checks if text is valid JSON",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  try {
    JSON.parse(state.text);
    state.text = 'Valid JSON';
  } catch (error) {
    state.text = \`Invalid JSON: \${error.message}\`;
  }
}
