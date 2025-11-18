/**
  {
    "api": 1,
    "name": "Validate IPv4 Address",
    "description": "Checks if text is a valid IPv4 address",
    "author": "Boop",
    "icon": "network",
    "tags": "network,ip,mac,url,validate"
  }
**/

function main(state) {
  const ipv4Regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.){3}(25[0-5]|(2[0-4]|1\d|[1-9]|)\d)$/;
  const isValid = ipv4Regex.test(state.text.trim());
  state.text = isValid ? 'Valid IPv4 address' : 'Invalid IPv4 address';
}
