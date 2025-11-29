/**
{
  "api": 1,
  "name": "Surround Each Line",
  "description": "Surrounds lines with custom characters",
  "author": "Boop",
  "icon": "textformat",
  "tags": "wrap,surround,custom"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  if (lines.length < 3) {
    state.postError("Char 1 on line 1, char 2 on line 2, text follows");
    return;
  }

  const before = lines[0];
  const after = lines[1];
  const textLines = lines.slice(2);

  const surrounded = textLines.map(line => before + line + after);

  state.text = surrounded.join('\n');
}
