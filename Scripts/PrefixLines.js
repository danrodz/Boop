/**
  {
    "api": 1,
    "name": "Prefix Lines",
    "description": "Adds prefix to each line (first line = prefix)",
    "author": "Boop",
    "icon": "text.insert",
    "tags": "prefix,lines,prepend,add"
  }
**/

function main(state) {
  const lines = state.text.split('\n');

  if (lines.length < 2) {
    state.postError("First line should be the prefix, remaining lines are the content");
    return;
  }

  const prefix = lines[0];
  const content = lines.slice(1);

  state.text = content.map(line => prefix + line).join('\n');
}
