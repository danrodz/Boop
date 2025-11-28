/**
{
  "api": 1,
  "name": "Generate GUIDs",
  "description": "Generates GUIDs/UUIDs (enter count)",
  "author": "Boop",
  "icon": "number.square",
  "tags": "guid,uuid,generate,unique"
}
**/

function main(state) {
  const count = parseInt(state.text.trim()) || 1;
  const guids = [];

  for (let i = 0; i < count; i++) {
    guids.push(([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ Math.random() * 16 >> c / 4).toString(16)
    ));
  }

  state.text = guids.join('\n');
}
