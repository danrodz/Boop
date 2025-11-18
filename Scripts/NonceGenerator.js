/**
  {
    "api": 1,
    "name": "Nonce Generator",
    "description": "Generate cryptographic nonce",
    "author": "Boop",
    "icon": "number.circle",
    "tags": "nonce,crypto,random,generate"
  }
**/
function main(state) {
  const length = parseInt(state.text) || 16;
  const hex = '0123456789abcdef';
  let nonce = '';
  for (let i = 0; i < length * 2; i++) nonce += hex[Math.floor(Math.random() * hex.length)];
  state.text = 'Nonce (hex): ' + nonce + '\nTimestamp-based: ' + Date.now().toString(16) + nonce.substring(0, 16);
}
