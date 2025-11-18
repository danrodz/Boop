/**
  {
    "api": 1,
    "name": "MAC Address to Dash Format",
    "description": "Converts MAC address to dash format",
    "author": "Boop",
    "icon": "network",
    "tags": "network,ip,mac,url,validate"
  }
**/

function main(state) {
  const mac = state.text.replace(/[:-]/g, '');
  const formatted = mac.match(/.{1,2}/g).join('-');
  state.text = formatted.toUpperCase();
}
