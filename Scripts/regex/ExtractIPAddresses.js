/**
  {
    "api": 1,
    "name": "Extract IP Addresses",
    "description": "Extracts all IPv4 addresses",
    "author": "Boop",
    "icon": "magnifyingglass",
    "tags": "regex,extract,pattern,match"
  }
**/

function main(state) {
  const ipRegex = /\b((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.){3}(25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\b/g;
  const ips = state.text.match(ipRegex) || [];
  state.text = ips.join('\n');
}
