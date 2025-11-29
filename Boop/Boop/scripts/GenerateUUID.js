/**
{
  "api": 1,
  "name": "Generate Multiple UUIDs",
  "description": "Generate multiple UUIDv4s (enter number on first line)",
  "author": "Boop",
  "icon": "fingerprint",
  "tags": "uuid,generate,random"
}
**/

function main(state) {
  const count = parseInt(state.text.trim()) || 1;
  const uuids = [];

  for (let i = 0; i < count; i++) {
    uuids.push(generateUUID());
  }

  state.text = uuids.join('\n');
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
