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
  
  const count = parseInt(state.text.trim()) || 1;
  const uuids = [];
  
  for (let i = 0; i < Math.min(count, 100); i++) {
    uuids.push(generateUUID());
  }
  
  state.text = uuids.join('\n');
  state.postInfo(`Generated ${uuids.length} UUID(s)`);
}
