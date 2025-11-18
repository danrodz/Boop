/**
  {
    "api": 1,
    "name": "Extract URLs",
    "description": "Extract all URLs from text",
    "author": "Boop",
    "icon": "link",
    "tags": "extract,url,link,parse,text"
  }
**/

function main(state) {
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/g;
  const urls = state.text.match(urlRegex);

  if (urls && urls.length > 0) {
    const unique = [...new Set(urls)];
    state.text = unique.join('\n');
    state.postInfo(`Found ${unique.length} unique URL(s)`);
  } else {
    state.text = "No URLs found";
    state.postError("No URLs found");
  }
}
