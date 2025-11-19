/**
  {
    "api": 1,
    "name": "IPv4 to Integer",
    "description": "Converts IPv4 address to integer",
    "author": "Boop",
    "icon": "network",
    "tags": "network,ip,mac,url,validate"
  }
**/

function main(state) {
  const parts = state.text.trim().split('.');
  if (parts.length !== 4) {
    state.postError('Invalid IPv4 address');
    return;
  }
  const num = parts.reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
  state.text = String(num);
}
