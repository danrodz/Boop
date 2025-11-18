/**
  {
    "api": 1,
    "name": "Generate UUID (Simple)",
    "description": "Generates a simple UUID-like identifier",
    "author": "Boop",
    "icon": "hash",
    "tags": "uuid,guid,generate,random,identifier"
  }
**/

function main(state) {
  try {
    // Generate a simple UUID-like string
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    state.text = uuid;
  } catch (error) {
    state.postError("Failed to generate UUID");
  }
}
