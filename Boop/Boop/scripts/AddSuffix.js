/**
{
  "api": 1,
  "name": "Add Custom Suffix",
  "description": "Adds custom suffix to each line (suffix on line 1)",
  "author": "Boop",
  "icon": "textformat",
  "tags": "suffix,add,custom"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  if (lines.length < 2) {
    state.postError("Suffix on line 1, text follows");
    return;
  }

  const suffix = lines[0];
  const textLines = lines.slice(1);
  const suffixed = textLines.map(line => line + suffix);

  state.text = suffixed.join('\n');
}
