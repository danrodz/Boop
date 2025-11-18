/**
  {
    "api": 1,
    "name": "Count Email Addresses",
    "description": "Counts email addresses",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const emails = state.text.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  state.text = \`Email addresses found: \${emails.length}\`;
}
