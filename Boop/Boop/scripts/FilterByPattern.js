/**
{
  "api": 1,
  "name": "Filter Lines by Pattern",
  "description": "Keeps lines matching regex (pattern on line 1)",
  "author": "Boop",
  "icon": "line.horizontal.3.decrease",
  "tags": "filter,grep,regex"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  if (lines.length < 2) {
    state.postError("Pattern on line 1, text follows");
    return;
  }

  const pattern = new RegExp(lines[0]);
  const textLines = lines.slice(1);
  const filtered = textLines.filter(line => pattern.test(line));

  state.text = filtered.join('\n');
}
