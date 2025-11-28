/**
{
  "api": 1,
  "name": "Find and Replace",
  "description": "Find and replace text (pattern on line 1, replacement on line 2, text follows)",
  "author": "Boop",
  "icon": "arrow.left.arrow.right.square",
  "tags": "find,replace,search,substitute"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  if (lines.length < 3) {
    state.postError("Need pattern (line 1), replacement (line 2), then text");
    return;
  }

  const pattern = lines[0];
  const replacement = lines[1];
  const text = lines.slice(2).join('\n');

  state.text = text.replace(new RegExp(pattern, 'g'), replacement);
}
