/**
{
  "api": 1,
  "name": "List Union",
  "description": "Union of two lists (separate with blank line)",
  "author": "Boop",
  "icon": "circle.grid.cross",
  "tags": "list,union,set,merge"
}
**/

function main(state) {
  const parts = state.text.split('\n\n');
  if (parts.length !== 2) {
    state.postError("Separate two lists with a blank line");
    return;
  }

  const list1 = new Set(parts[0].split('\n').filter(l => l.trim()));
  const list2 = new Set(parts[1].split('\n').filter(l => l.trim()));

  const union = new Set([...list1, ...list2]);
  state.text = Array.from(union).sort().join('\n');
}
