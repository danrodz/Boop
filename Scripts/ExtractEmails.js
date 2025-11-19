/**
  {
    "api": 1,
    "name": "Extract All Emails",
    "description": "Extracts and deduplicates all email addresses",
    "author": "Boop",
    "icon": "envelope.fill",
    "tags": "email,extract,find,parse"
  }
**/

function main(state) {
  // Comprehensive email regex (RFC 5322 simplified)
  const emailRegex = /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+/g;

  const matches = state.text.match(emailRegex);

  if (!matches || matches.length === 0) {
    state.postError("No email addresses found");
    return;
  }

  // Deduplicate and sort
  const unique = [...new Set(matches)].sort();

  state.text = unique.join('\n') + `\n\n(${unique.length} unique email${unique.length === 1 ? '' : 's'} found)`;
}
