/**
  {
    "api": 1,
    "name": "Mirror Text",
    "description": "Mirror/reverse text horizontally",
    "author": "Boop",
    "icon": "arrow.left.and.right",
    "tags": "mirror,reverse,flip,horizontal"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const mirrored = lines.map(line => line.split('').reverse().join('')).join('\n');

    state.text = mirrored;
  } catch (error) {
    state.postError("Error mirroring text: " + error.message);
  }
}
