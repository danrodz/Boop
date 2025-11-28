/**
{
  "api": 1,
  "name": "Extract Domain from URL",
  "description": "Extracts domain from URLs",
  "author": "Boop",
  "icon": "link",
  "tags": "extract,domain,url,parse"
}
**/

function main(state) {
  const urlRegex = /https?:\/\/([^\/:?#]+)/gi;
  const matches = [];
  let match;

  while ((match = urlRegex.exec(state.text)) !== null) {
    matches.push(match[1]);
  }

  state.text = matches.join('\n');
}
