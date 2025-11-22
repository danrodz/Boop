/**
  {
    "api": 1,
    "name": "Extract @Mentions",
    "description": "Extracts all @mentions from text",
    "author": "Boop",
    "icon": "at",
    "tags": "mentions,extract,twitter,social,parse,username"
  }
**/

function main(state) {
  const mentionPattern = /@[a-zA-Z][a-zA-Z0-9_]*/g;
  const matches = state.text.match(mentionPattern);
  
  if (!matches || matches.length === 0) {
    state.postError("No @mentions found");
    return;
  }
  
  const unique = [...new Set(matches.map(m => m.toLowerCase()))];
  state.text = unique.join('\n');
  state.postInfo(`Found ${matches.length} mention(s), ${unique.length} unique`);
}
