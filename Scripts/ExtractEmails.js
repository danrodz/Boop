/**
  {
    "api": 1,
    "name": "Extract Email Addresses",
    "description": "Extract all email addresses from text",
    "author": "Boop",
    "icon": "mail",
    "tags": "extract,email,parse,text"
  }
**/

function main(state) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = state.text.match(emailRegex);

  if (emails && emails.length > 0) {
    const unique = [...new Set(emails)];
    state.text = unique.join('\n');
    state.postInfo(`Found ${unique.length} unique email(s)`);
  } else {
    state.text = "No email addresses found";
    state.postError("No emails found");
  }
}
