/**
  {
    "api": 1,
    "name": "Extract Email Addresses",
    "description": "Extracts all email addresses",
    "author": "Boop",
    "icon": "magnifyingglass",
    "tags": "regex,extract,pattern,match"
  }
**/

function main(state) {
  const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = state.text.match(emailRegex) || [];
  state.text = emails.join('\n');
}
