/**
  {
    "api": 1,
    "name": "Generate UUID",
    "description": "Generate a random UUID v4",
    "author": "Boop",
    "icon": "key",
    "tags": "uuid,generate,random,api,identifier"
  }
**/

function main(state) {
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  state.text = uuidv4();
  state.postInfo("Generated UUID");
}
