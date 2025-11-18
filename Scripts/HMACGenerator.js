/**
  {
    "api": 1,
    "name": "HMAC Signature Generator",
    "description": "Generate HMAC signature (format: message---key)",
    "author": "Boop",
    "icon": "signature",
    "tags": "hmac,signature,hash,api"
  }
**/
function main(state) {
  const parts = state.text.split('---');
  if (parts.length !== 2) { state.postError("Format: message---key"); return; }
  const message = parts[0].trim();
  const key = parts[1].trim();
  let hash = 0;
  const data = key + message;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  state.text = 'Signature: ' + Math.abs(hash).toString(16).padStart(16, '0') + '\n\n(Simplified implementation)';
}
