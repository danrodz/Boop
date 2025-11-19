/**
  {
    "api": 1,
    "name": "Validate MAC Address",
    "description": "Checks if text is a valid MAC address",
    "author": "Boop",
    "icon": "network",
    "tags": "network,ip,mac,url,validate"
  }
**/

function main(state) {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  const isValid = macRegex.test(state.text.trim());
  state.text = isValid ? 'Valid MAC address' : 'Invalid MAC address';
}
