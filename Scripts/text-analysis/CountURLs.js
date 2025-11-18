/**
  {
    "api": 1,
    "name": "Count URLs",
    "description": "Counts URLs in text",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const urls = state.text.match(/https?:\/\/[^\s]+/g) || [];
  state.text = \`URLs found: \${urls.length}\`;
}
