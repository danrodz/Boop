/**
  {
    "api": 1,
    "name": "Generate Nanoid",
    "description": "Generate URL-friendly unique ID (Nanoid)",
    "author": "Boop",
    "icon": "key",
    "tags": "nanoid,id,generate,unique"
  }
**/

function main(state) {
  try {
    const size = parseInt(state.text) || 21;
    const alphabet = '_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let id = '';
    for (let i = 0; i < size; i++) {
      id += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    state.text = id;
  } catch (error) {
    state.postError("Failed to generate Nanoid: " + error.message);
  }
}
