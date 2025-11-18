/**
  {
    "api": 1,
    "name": "Integer to IPv4",
    "description": "Converts integer to IPv4 address",
    "author": "Boop",
    "icon": "network",
    "tags": "network,ip,mac,url,validate"
  }
**/

function main(state) {
  const num = parseInt(state.text.trim());
  const ip = [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255
  ].join('.');
  state.text = ip;
}
