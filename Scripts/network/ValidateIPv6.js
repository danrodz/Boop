/**
  {
    "api": 1,
    "name": "Validate IPv6 Address",
    "description": "Checks if text is a valid IPv6 address",
    "author": "Boop",
    "icon": "network",
    "tags": "network,ip,mac,url,validate"
  }
**/

function main(state) {
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})$/;
  const isValid = ipv6Regex.test(state.text.trim());
  state.text = isValid ? 'Valid IPv6 address' : 'Invalid IPv6 address';
}
