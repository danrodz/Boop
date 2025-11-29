/**
  {
    "api": 1,
    "name": "Suffix Lines",
    "description": "Adds suffix to each line (first line = suffix)",
    "author": "Boop",
    "icon": "text.append",
    "tags": "suffix,lines,append,add"
  }
**/

function main(state) {
  const lines = state.text.split('\n');

  if (lines.length < 2) {
    state.postError("First line should be the suffix, remaining lines are the content");
    return;
  }

  const suffix = lines[0];
  const content = lines.slice(1);

  state.text = content.map(line => line + suffix).join('\n');
}
