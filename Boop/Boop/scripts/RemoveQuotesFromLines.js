/**
{
  "api": 1,
  "name": "Remove Quotes From Lines",
  "description": "Removes surrounding quotes from each line",
  "author": "Boop",
  "icon": "quote",
  "tags": "unwrap,quotes,remove"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const unwrapped = lines.map(line => {
    return line.replace(/^["'`]|["'`]$/g, '');
  });
  state.text = unwrapped.join('\n');
}
