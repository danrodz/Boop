/**
  {
    "api": 1,
    "name": "Extract Domains",
    "description": "Extracts all domain names/URLs from the text",
    "author": "Boop",
    "icon": "link",
    "tags": "extract,domain,url,website,link"
  }
**/

function main(state) {
  try {
    // Match domains and URLs
    const domainRegex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+)/g;
    const matches = state.text.match(domainRegex);

    if (matches && matches.length > 0) {
      // Remove duplicates
      const unique = [...new Set(matches)];
      state.text = unique.join('\n');
      state.postInfo(`Found ${unique.length} unique domain(s)`);
    } else {
      state.text = '';
      state.postInfo('No domains found');
    }
  } catch (error) {
    state.postError("Failed to extract domains: " + error.message);
  }
}
