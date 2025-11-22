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
  // Match URLs with various protocols
  const urlPattern = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi;
  const matches = state.text.match(urlPattern);

  if (!matches || matches.length === 0) {
    state.postError("No URLs found");
    return;
  }

  // Clean trailing punctuation that's likely not part of URL
  const cleaned = matches.map(url => {
    return url.replace(/[.,;:!?)]+$/, '');
  });

  const unique = [...new Set(cleaned)];

  state.text = unique.join('\n') + `\n\n---\nFound: ${matches.length} URLs\nUnique: ${unique.length}`;
}
