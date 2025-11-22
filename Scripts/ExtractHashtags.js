/**
  {
    "api": 1,
    "name": "Extract Hashtags",
    "description": "Extracts all hashtags from text",
    "author": "Boop",
    "icon": "number",
    "tags": "hashtag,extract,twitter,social,parse"
  }
**/

function main(state) {
  const hashtagPattern = /#[a-zA-Z][a-zA-Z0-9_]*/g;
  const matches = state.text.match(hashtagPattern);
  
  if (!matches || matches.length === 0) {
    state.postError("No hashtags found");
    return;
  }
  
  const unique = [...new Set(matches.map(h => h.toLowerCase()))];
  state.text = unique.join('\n');
  state.postInfo(`Found ${matches.length} hashtag(s), ${unique.length} unique`);
}
