/**
  {
    "api": 1,
    "name": "Extract All URLs",
    "description": "Extracts and deduplicates all URLs (http/https)",
    "author": "Boop",
    "icon": "link.circle.fill",
    "tags": "url,extract,find,parse,link"
  }
**/

function main(state) {
  // Match http/https URLs
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/g;

  const matches = state.text.match(urlRegex);

  if (!matches || matches.length === 0) {
    state.postError("No URLs found");
    return;
  }

  // Deduplicate and sort
  const unique = [...new Set(matches)].sort();

  state.text = unique.join('\n') + `\n\n(${unique.length} unique URL${unique.length === 1 ? '' : 's'} found)`;
}
