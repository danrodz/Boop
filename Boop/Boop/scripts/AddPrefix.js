/**
{
  "api": 1,
  "name": "Add Custom Prefix",
  "description": "Adds custom prefix to each line (prefix on line 1)",
  "author": "Boop",
  "icon": "textformat",
  "tags": "prefix,add,custom"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  if (lines.length < 2) {
    state.postError("Prefix on line 1, text follows");
    return;
  }

  const prefix = lines[0];
  const textLines = lines.slice(1);
  const prefixed = textLines.map(line => prefix + line);

  state.text = prefixed.join('\n');
}
