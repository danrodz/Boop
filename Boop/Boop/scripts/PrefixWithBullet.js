/**
{
  "api": 1,
  "name": "Add Bullet Points",
  "description": "Adds bullet points (•) to each line",
  "author": "Boop",
  "icon": "list.bullet",
  "tags": "bullet,list,prefix"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const bulleted = lines.map(line => '• ' + line);
  state.text = bulleted.join('\n');
}
