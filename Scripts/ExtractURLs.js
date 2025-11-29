/**
  {
    "api": 1,
    "name": "Extract URLs",
    "description": "Extracts all URLs from text",
    "author": "Boop",
    "icon": "link",
    "tags": "url,extract,links,http,https"
  }
**/

function main(state) {
  const urlPattern = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi;
  const matches = state.text.match(urlPattern);

  if (!matches || matches.length === 0) {
    if (typeof state.postError === 'function') {
      state.postError("No URLs found");
    }
    return;
  }

  const cleaned = matches.map(url => url.replace(/[.,;:!?)]+$/, ''));
  const unique = [...new Set(cleaned)];

  state.text = unique.join('\n');

  if (typeof state.postInfo === 'function') {
    state.postInfo(`Found ${matches.length} URL(s), ${unique.length} unique`);
  }
}
