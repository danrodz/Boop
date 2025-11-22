/**
  {
    "api": 1,
    "name": "Extract Emails",
    "description": "Extracts all email addresses from text",
    "author": "Boop",
    "icon": "envelope",
    "tags": "email,extract,addresses,find,parse"
  }
**/

function main(state) {
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = state.text.match(emailPattern);
  
  if (!matches || matches.length === 0) {
    state.postError("No email addresses found");
    return;
  }
  
  const unique = [...new Set(matches)];
  state.text = unique.join('\n');
  state.postInfo(`Found ${matches.length} email(s), ${unique.length} unique`);
}
