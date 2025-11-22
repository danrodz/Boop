/**
  {
    "api": 1,
    "name": "Extract Phone Numbers",
    "description": "Extracts phone numbers from text",
    "author": "Boop",
    "icon": "phone",
    "tags": "phone,extract,numbers,find,parse"
  }
**/

function main(state) {
  // Matches various phone formats
  const phonePattern = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const matches = state.text.match(phonePattern);
  
  if (!matches || matches.length === 0) {
    state.postError("No phone numbers found");
    return;
  }
  
  const unique = [...new Set(matches.map(p => p.trim()))];
  state.text = unique.join('\n');
  state.postInfo(`Found ${matches.length} phone number(s), ${unique.length} unique`);
}
