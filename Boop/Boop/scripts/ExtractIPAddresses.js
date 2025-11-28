/**
{
  "api": 1,
  "name": "Extract IP Addresses",
  "description": "Extracts IPv4 addresses from text",
  "author": "Boop",
  "icon": "network",
  "tags": "extract,ip,address,network"
}
**/

function main(state) {
  const ipRegex = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g;
  const matches = state.text.match(ipRegex) || [];

  state.text = matches.join('\n');
}
