/**
  {
    "api": 1,
    "name": "Validate XML (Basic)",
    "description": "Basic XML validation",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  const openTags = state.text.match(/<([a-z][a-z0-9]*)[^>]*>/gi) || [];
  const closeTags = state.text.match(/<\/([a-z][a-z0-9]*)>/gi) || [];
  const isBalanced = openTags.length === closeTags.length;
  state.text = isBalanced ? 'Tags appear balanced' : 'Tags may be unbalanced';
}
