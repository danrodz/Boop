/**
{
  "api": 1,
  "name": "Base64 Encode (URL-Safe)",
  "description": "Encodes to URL-safe Base64",
  "author": "Boop",
  "icon": "lock",
  "tags": "base64,url,safe,encode"
}
**/

const { encode } = require('@boop/base64')

function main(state) {
  let encoded = encode(state.text);
  // Make URL-safe by replacing + with - and / with _
  encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  state.text = encoded;
}
