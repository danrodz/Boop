/**
  {
    "api": 1,
    "name": "UUID v4 Generate",
    "description": "Generates a cryptographically random UUID v4",
    "author": "Boop",
    "icon": "number.circle.fill",
    "tags": "uuid,generate,random,guid"
  }
**/

function main(state) {
  // Generate cryptographically strong random UUID v4
  const uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
  state.insert(uuid);
}
