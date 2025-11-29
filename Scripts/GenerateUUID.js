/**
  {
    "api": 1,
    "name": "Generate UUID v4",
    "description": "Generates a random UUID v4",
    "author": "Boop",
    "icon": "number.square",
    "tags": "uuid,generate,random,unique,identifier"
  }
**/

function main(state) {
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const raw = (state.text || '').trim();
  const count = Math.max(1, Math.min(parseInt(raw, 10) || 1, 100));
  const uuids = [];

  for (let i = 0; i < count; i++) {
    uuids.push(generateUUID());
  }

  state.text = uuids.join('\n');
  if (typeof state.postInfo === 'function') {
    state.postInfo(`Generated ${uuids.length} UUID(s)`);
  }
}
