/**
{
  "api": 1,
  "name": "Wrap in HTML Tag",
  "description": "Wraps in HTML tag (tag name on line 1)",
  "author": "Boop",
  "icon": "tag",
  "tags": "html,tag,wrap"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  if (lines.length < 2) {
    state.postError("Tag name on line 1, text follows");
    return;
  }

  const tag = lines[0];
  const text = lines.slice(1).join('\n');

  state.text = '<' + tag + '>' + text + '</' + tag + '>';
}
