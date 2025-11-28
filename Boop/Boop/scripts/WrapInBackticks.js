/**
{
  "api": 1,
  "name": "Wrap Lines in Backticks",
  "description": "Wraps each line in backticks for code",
  "author": "Boop",
  "icon": "code",
  "tags": "wrap,backticks,code,markdown"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const wrapped = lines.map(line => `\`${line}\``);
  state.text = wrapped.join('\n');
}
